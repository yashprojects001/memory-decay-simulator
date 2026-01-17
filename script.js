let chart;

function simulate() {
    const topic = document.getElementById("topic").value;
    const difficulty = document.getElementById("difficulty").value;
    const date = document.getElementById("date").value;
    const confidence = parseInt(document.getElementById("confidence").value);

    if (!topic || !date) {
        alert("Please fill all fields");
        return;
    }

    const daysPassed = Math.floor(
        (new Date() - new Date(date)) / (1000 * 60 * 60 * 24)
    );

    let k;
    if (difficulty === "easy") k = 0.08;
    if (difficulty === "medium") k = 0.12;
    if (difficulty === "hard") k = 0.18;

    k -= confidence * 0.01;

    let days = [];
    let retention = [];

    for (let i = 0; i <= 30; i++) {
        days.push(i);
        retention.push(Math.exp(-k * i) * 100);
    }

    const currentRetention = Math.exp(-k * daysPassed) * 100;

    document.getElementById("retentionText").innerText =
        `📘 Topic: ${topic} | Current Retention: ${currentRetention.toFixed(1)}%`;

    document.getElementById("adviceText").innerText =
        currentRetention < 40
            ? "⚠️ Memory is fading fast. Revise now!"
            : "✅ Memory is stable. Revision can wait.";

    drawChart(days, retention);
}

function drawChart(days, retention) {
    const ctx = document.getElementById("memoryChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: days,
            datasets: [{
                label: "Memory Retention (%)",
                data: retention,
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    min: 0,
                    max: 100
                }
            }
        }
    });
}
