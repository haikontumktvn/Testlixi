document.getElementById("bocLiXi").addEventListener("click", function () {
    let players = parseInt(document.getElementById("players").value);
    
    if (isNaN(players) || players < 1 || players > 8) {
        alert("Vui lòng nhập số người chơi từ 1 đến 8!");
        return;
    }

    const totalBudget = 10000; // Tổng giới hạn tiền lì xì (10,000円)
    let maxPerPlayer = totalBudget / players;

    // Danh sách lì xì với trọng số ban đầu
    let liXiList = [
        { amount: 3468, message: "Thăng tiến, làm ăn thuận lợi", weight: 30 },
        { amount: 7939, message: "Thần tài lớn + thần tài nhỏ", weight: 10 },
        { amount: 1102, message: "Độc nhất, không bị trùng lặp", weight: 20 },
        { amount: 6868, message: "Lộc phát, may mắn liên tục", weight: 15 },
        { amount: 4078, message: "Cầu chúc mùa vụ suôn sẻ", weight: 25 },
        { amount: 2204, message: "Sống thọ, trường tồn mãi mãi", weight: 40 },
        { amount: 8386, message: "Phát tài phát lộc", weight: 10 }
    ];

    // Điều chỉnh tỉ lệ theo số người chơi
    if (maxPerPlayer < 5000) { 
        liXiList = liXiList.map(liXi => {
            if (liXi.amount > maxPerPlayer) {
                liXi.weight /= 2; // Giảm tỉ lệ trúng lì xì lớn
            } else {
                liXi.weight *= 1.5; // Tăng tỉ lệ lì xì nhỏ
            }
            return liXi;
        });
    }

    let totalWeight = liXiList.reduce((sum, liXi) => sum + liXi.weight, 0);
    let results = [];

    for (let i = 0; i < players; i++) {
        let randomNum = Math.random() * totalWeight;
        let chosenLiXi;
        
        for (let liXi of liXiList) {
            if (randomNum < liXi.weight) {
                chosenLiXi = liXi;
                break;
            }
            randomNum -= liXi.weight;
        }
        
        results.push(`Người ${i + 1}: 🎉 ${chosenLiXi.amount} VNĐ - <em>${chosenLiXi.message}</em>`);
    }

    document.getElementById("ketQua").innerHTML = results.join("<br>");
});
