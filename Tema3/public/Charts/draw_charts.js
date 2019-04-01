
function draw_bar() {
    let ctx = document.getElementById('responses');
    ctx.height = 100;
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Accept', 'Refuz'],
            datasets: [{
                label: '# of Responses',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
                responsive: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function draw_pie() {
    let ctx = document.getElementById('country');
    ctx.height = 100;
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Romania', 'Jamaica', 'Spania', 'China', 'USA'],
            datasets: [{
                label: '# of Countries',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(100, 162, 235)',
                    'rgba(200, 45, 235)',
                    'rgba(150, 87, 235)',
                    'rgba(50, 12, 235)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
                responsive: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


window.onload = () => {
    draw_pie();
    draw_bar();
};