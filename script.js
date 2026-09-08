// ============ NAVEGAÇÃO ============

function startExplorer() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('explorer').classList.remove('hidden');
    updateFraction();
}

function startComparison() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('comparison').classList.remove('hidden');
    generateComparison();
}

function startIdentify() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('identify').classList.remove('hidden');
    generateIdentify();
}

function startAddition() {
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('addition').classList.remove('hidden');
    generateAddition();
}

function backToMenu() {
    document.querySelectorAll('.activity-container').forEach(el => {
        el.classList.add('hidden');
    });
    document.getElementById('mainMenu').classList.remove('hidden');
    clearResults();
}

function clearResults() {
    document.getElementById('comparisonResult').classList.add('hidden');
    document.getElementById('identifyResult').classList.add('hidden');
    document.getElementById('additionResult').classList.add('hidden');
    
    document.querySelectorAll('.fraction-card').forEach(card => {
        card.classList.remove('correct', 'incorrect');
    });
    
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
}

// ============ EXPLORADOR DE FRAÇÕES ============

const fractionNames = {
    '1/2': 'Uma metade',
    '1/3': 'Um terço',
    '2/3': 'Dois terços',
    '1/4': 'Um quarto',
    '2/4': 'Dois quartos (metade)',
    '3/4': 'Três quartos',
    '1/5': 'Um quinto',
    '2/5': 'Dois quintos',
    '3/5': 'Três quintos',
    '4/5': 'Quatro quintos',
    '1/6': 'Um sexto',
    '2/6': 'Dois sextos (um terço)',
    '3/6': 'Três sextos (uma metade)',
    '4/6': 'Quatro sextos (dois terços)',
    '5/6': 'Cinco sextos',
    '1/7': 'Um sétimo',
    '1/8': 'Um oitavo',
};

function updateFraction() {
    const numerator = parseInt(document.getElementById('numerator').value);
    const denominator = parseInt(document.getElementById('denominator').value);
    
    // Atualizar valores dos controles
    document.getElementById('numeratorValue').textContent = numerator;
    document.getElementById('denominatorValue').textContent = denominator;
    
    const fractionString = `${numerator}/${denominator}`;
    
    // Atualizar texto da fração
    document.getElementById('fractionText').textContent = fractionString;
    document.getElementById('fractionName').textContent = fractionNames[fractionString] || `${numerator} de ${denominator}`;
    
    // Desenhar fração
    drawFraction('visualFraction', numerator, denominator);
}

function drawFraction(elementId, numerator, denominator) {
    const container = document.getElementById(elementId);
    container.innerHTML = '';
    
    // Garantir que não haja mais que 8 partes
    const parts = Math.min(denominator, 8);
    
    for (let i = 0; i < parts; i++) {
        const piece = document.createElement('div');
        piece.className = 'fraction-piece';
        if (i < numerator) {
            piece.classList.add('colored');
        }
        piece.textContent = i + 1;
        container.appendChild(piece);
    }
}

// ============ COMPARAÇÃO DE FRAÇÕES ============

let currentComparison = {};

function generateComparison() {
    clearResults();
    
    const fractions = [
        { num: 1, den: 2, value: 0.5 },
        { num: 1, den: 3, value: 0.333 },
        { num: 2, den: 3, value: 0.666 },
        { num: 1, den: 4, value: 0.25 },
        { num: 3, den: 4, value: 0.75 },
        { num: 1, den: 5, value: 0.2 },
        { num: 2, den: 5, value: 0.4 },
        { num: 3, den: 5, value: 0.6 },
        { num: 4, den: 5, value: 0.8 },
    ];
    
    const frac1 = fractions[Math.floor(Math.random() * fractions.length)];
    let frac2 = fractions[Math.floor(Math.random() * fractions.length)];
    
    // Garantir que sejam diferentes
    while (frac1.value === frac2.value) {
        frac2 = fractions[Math.floor(Math.random() * fractions.length)];
    }
    
    currentComparison = { frac1, frac2 };
    
    // Renderizar frações
    drawFraction('visualFraction1', frac1.num, frac1.den);
    drawFraction('visualFraction2', frac2.num, frac2.den);
    
    document.getElementById('fractionText1').textContent = `${frac1.num}/${frac1.den}`;
    document.getElementById('fractionText2').textContent = `${frac2.num}/${frac2.den}`;
    
    // Atualizar símbolo de comparação
    const symbol = frac1.value > frac2.value ? '>' : '<';
    document.getElementById('comparisonSymbol').textContent = '?';
}

function checkComparison(choice) {
    const { frac1, frac2 } = currentComparison;
    const isCorrect = (choice === 1 && frac1.value > frac2.value) || 
                      (choice === 2 && frac2.value > frac1.value);
    
    showComparisonResult(isCorrect, choice, frac1, frac2);
}

function showComparisonResult(isCorrect, choice, frac1, frac2) {
    const resultBox = document.getElementById('comparisonResult');
    const correctCard = choice === 1 ? document.getElementById('fractionCard1') : document.getElementById('fractionCard2');
    
    correctCard.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    const symbol = frac1.value > frac2.value ? '>' : '<';
    
    resultBox.innerHTML = `
        <div class="result-emoji">${isCorrect ? '🎉' : '💭'}</div>
        <p>${isCorrect ? 'Parabéns! Você acertou!' : 'Não foi dessa vez!'}</p>
        <p>${frac1.num}/${frac1.den} ${symbol} ${frac2.num}/${frac2.den}</p>
        <p style="font-size: 0.9em; margin-top: 15px; color: #666;">
            ${frac1.num}/${frac1.den} = ${(frac1.value).toFixed(2)} e ${frac2.num}/${frac2.den} = ${(frac2.value).toFixed(2)}
        </p>
    `;
    
    resultBox.classList.add(isCorrect ? 'correct' : 'incorrect');
    resultBox.classList.remove('hidden');
}

// ============ IDENTIFICAR FRAÇÕES ============

let currentFractionToIdentify = {};

function generateIdentify() {
    clearResults();
    
    const options = [
        { num: 1, den: 2 },
        { num: 1, den: 3 },
        { num: 1, den: 4 },
        { num: 1, den: 5 },
        { num: 1, den: 6 },
        { num: 2, den: 3 },
        { num: 2, den: 4 },
        { num: 2, den: 5 },
        { num: 3, den: 4 },
        { num: 3, den: 5 },
    ];
    
    const correctFraction = options[Math.floor(Math.random() * options.length)];
    currentFractionToIdentify = correctFraction;
    
    // Desenhar a fração a ser identificada
    drawFraction('visualFractionIdentify', correctFraction.num, correctFraction.den);
    
    // Gerar opções
    let optionsArray = [correctFraction];
    while (optionsArray.length < 4) {
        const option = options[Math.floor(Math.random() * options.length)];
        if (!optionsArray.find(o => o.num === option.num && o.den === option.den)) {
            optionsArray.push(option);
        }
    }
    
    // Embaralhar
    optionsArray = optionsArray.sort(() => Math.random() - 0.5);
    
    // Renderizar botões de opção
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`option${i + 1}`);
        btn.textContent = `${optionsArray[i].num}/${optionsArray[i].den}`;
        btn.dataset.num = optionsArray[i].num;
        btn.dataset.den = optionsArray[i].den;
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    }
}

function checkIdentify(optionNumber) {
    const btn = document.getElementById(`option${optionNumber}`);
    const num = parseInt(btn.dataset.num);
    const den = parseInt(btn.dataset.den);
    
    const isCorrect = num === currentFractionToIdentify.num && den === currentFractionToIdentify.den;
    
    // Desabilitar todos os botões
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`option${i}`).disabled = true;
    }
    
    // Marcar resposta
    btn.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Se incorreto, mostrar a correta
    if (!isCorrect) {
        for (let i = 1; i <= 4; i++) {
            const button = document.getElementById(`option${i}`);
            if (parseInt(button.dataset.num) === currentFractionToIdentify.num && 
                parseInt(button.dataset.den) === currentFractionToIdentify.den) {
                button.classList.add('correct');
            }
        }
    }
    
    // Mostrar resultado
    const resultBox = document.getElementById('identifyResult');
    resultBox.innerHTML = `
        <div class="result-emoji">${isCorrect ? '🎉' : '💭'}</div>
        <p>${isCorrect ? 'Parabéns! Você identificou corretamente!' : 'Não foi dessa vez!'}</p>
        <p style="font-size: 1.5em; color: #667eea; font-weight: bold;">${currentFractionToIdentify.num}/${currentFractionToIdentify.den}</p>
    `;
    resultBox.classList.add(isCorrect ? 'correct' : 'incorrect');
    resultBox.classList.remove('hidden');
}

// ============ SOMAR FRAÇÕES ============

let currentAddition = {};

function generateAddition() {
    clearResults();
    
    // Frações com mesmo denominador (mais fácil para crianças)
    const denominators = [2, 3, 4, 5, 6];
    const den = denominators[Math.floor(Math.random() * denominators.length)];
    
    const num1 = Math.floor(Math.random() * (den - 1)) + 1;
    const num2 = Math.floor(Math.random() * (den - num1)) + 1;
    
    const sum_num = num1 + num2;
    const sum_den = den;
    
    currentAddition = { num1, den, num2, sum_num, sum_den };
    
    // Desenhar frações
    drawFraction('visualFraction1Add', num1, den);
    drawFraction('visualFraction2Add', num2, den);
    
    document.getElementById('additionText').textContent = `${num1}/${den} + ${num2}/${den} = ?`;
    
    // Gerar opções de resposta
    let optionsArray = [
        { num: sum_num, den: sum_den }
    ];
    
    // Adicionar respostas incorretas
    while (optionsArray.length < 4) {
        const wrongNum = Math.floor(Math.random() * (den + 2)) + 1;
        const wrongDen = Math.floor(Math.random() * 4) + 2;
        
        if (!optionsArray.find(o => o.num === wrongNum && o.den === wrongDen) && 
            !(wrongNum === sum_num && wrongDen === sum_den)) {
            optionsArray.push({ num: wrongNum, den: wrongDen });
        }
    }
    
    // Embaralhar
    optionsArray = optionsArray.sort(() => Math.random() - 0.5);
    
    // Renderizar botões
    for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`addOption${i + 1}`);
        btn.textContent = `${optionsArray[i].num}/${optionsArray[i].den}`;
        btn.dataset.num = optionsArray[i].num;
        btn.dataset.den = optionsArray[i].den;
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    }
}

function checkAddition(optionNumber) {
    const btn = document.getElementById(`addOption${optionNumber}`);
    const num = parseInt(btn.dataset.num);
    const den = parseInt(btn.dataset.den);
    
    const isCorrect = num === currentAddition.sum_num && den === currentAddition.sum_den;
    
    // Desabilitar todos os botões
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`addOption${i}`).disabled = true;
    }
    
    // Marcar resposta
    btn.classList.add(isCorrect ? 'correct' : 'incorrect');
    
    // Se incorreto, mostrar a correta
    if (!isCorrect) {
        for (let i = 1; i <= 4; i++) {
            const button = document.getElementById(`addOption${i}`);
            if (parseInt(button.dataset.num) === currentAddition.sum_num && 
                parseInt(button.dataset.den) === currentAddition.sum_den) {
                button.classList.add('correct');
            }
        }
    }
    
    // Mostrar resultado
    const resultBox = document.getElementById('additionResult');
    resultBox.innerHTML = `
        <div class="result-emoji">${isCorrect ? '🎉' : '💭'}</div>
        <p>${isCorrect ? 'Parabéns! Você acertou a soma!' : 'Não foi dessa vez!'}</p>
        <p style="font-size: 1.3em; color: #667eea; font-weight: bold;">
            ${currentAddition.num1}/${currentAddition.den} + ${currentAddition.num2}/${currentAddition.den} = ${currentAddition.sum_num}/${currentAddition.sum_den}
        </p>
    `;
    resultBox.classList.add(isCorrect ? 'correct' : 'incorrect');
    resultBox.classList.remove('hidden');
}