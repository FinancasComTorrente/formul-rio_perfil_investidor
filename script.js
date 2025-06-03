// Script atualizado para o Formulário de Perfil de Risco - Matheus Torrente

document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const form = document.getElementById('risk-profile-form');
    const loader = document.getElementById('loader');
    const resultContainer = document.getElementById('result-container');
    const profileName = document.getElementById('profile-name');
    const profileDescription = document.getElementById('profile-description');
    const progressBar = document.getElementById('progress-bar');
    const progressMarker = document.getElementById('progress-marker');
    const restartBtn = document.getElementById('restart-btn');
    const progressIndicator = document.getElementById('progress-indicator');
    const mainProgressBar = document.getElementById('main-progress-bar');
    
    // Configuração das perguntas
    const questions = [
        {
            id: 'question1',
            text: 'Por quanto tempo você pretende manter seus investimentos antes de precisar utilizar uma parte significativa dos recursos?',
            options: [
                { value: '1', text: 'Menos de 1 ano' },
                { value: '2', text: 'Entre 1 e 3 anos' },
                { value: '3', text: 'Entre 3 e 5 anos' },
                { value: '4', text: 'Entre 5 e 10 anos' },
                { value: '5', text: 'Mais de 10 anos' }
            ],
            multiple: false
        },
        {
            id: 'question2',
            text: 'Como você avalia seu conhecimento sobre o mercado financeiro e diferentes tipos de investimentos?',
            options: [
                { value: '1', text: 'Não tenho conhecimento' },
                { value: '2', text: 'Tenho conhecimento básico' },
                { value: '3', text: 'Tenho conhecimento intermediário' },
                { value: '4', text: 'Tenho conhecimento avançado' },
                { value: '5', text: 'Sou especialista no assunto' }
            ],
            multiple: false
        },
        {
            id: 'question3',
            text: 'Quais tipos de investimentos você já realizou nos últimos anos?',
            options: [
                { value: '1', text: 'Poupança' },
                { value: '2', text: 'CDB ou Tesouro Direto' },
                { value: '3', text: 'Fundos de renda fixa' },
                { value: '4', text: 'Títulos públicos' },
                { value: '5', text: 'Fundos multimercado' },
                { value: '6', text: 'Ações' },
                { value: '7', text: 'Fundos imobiliários' },
                { value: '8', text: 'Derivativos' },
                { value: '9', text: 'Operações alavancadas' },
                { value: '10', text: 'Investimentos no exterior' }
            ],
            multiple: true
        },
        {
            id: 'question4',
            text: 'Se seus investimentos sofressem uma queda temporária de 20%, qual seria sua reação mais provável?',
            options: [
                { value: '1', text: 'Resgataria tudo imediatamente para evitar perdas maiores' },
                { value: '2', text: 'Resgataria parte dos investimentos' },
                { value: '3', text: 'Manteria os investimentos e aguardaria uma recuperação' },
                { value: '4', text: 'Manteria os investimentos e aproveitaria para investir mais' },
                { value: '5', text: 'Aumentaria significativamente minha posição, aproveitando os preços mais baixos' }
            ],
            multiple: false
        },
        {
            id: 'question5',
            text: 'Qual o principal objetivo dos seus investimentos?',
            options: [
                { value: '1', text: 'Preservar o capital, sem correr riscos' },
                { value: '2', text: 'Obter rendimento ligeiramente superior à inflação' },
                { value: '3', text: 'Crescimento moderado do patrimônio a médio prazo' },
                { value: '4', text: 'Crescimento significativo do patrimônio a longo prazo' },
                { value: '5', text: 'Maximizar retornos, mesmo com riscos elevados' }
            ],
            multiple: false
        },
        {
            id: 'question6',
            text: 'Como você se sente ao acompanhar notícias sobre oscilações no mercado financeiro?',
            options: [
                { value: '1', text: 'Muito ansioso, prefiro não acompanhar' },
                { value: '2', text: 'Preocupado, mas consigo manter a calma' },
                { value: '3', text: 'Tranquilo, entendo que faz parte do processo' },
                { value: '4', text: 'Confortável, vejo oportunidades nas oscilações' },
                { value: '5', text: 'Entusiasmado, busco ativamente aproveitar as volatilidades' }
            ],
            multiple: false
        },
        {
            id: 'question7',
            text: 'Se pudesse escolher a composição ideal para seus investimentos hoje, qual distribuição mais se aproximaria da sua preferência?',
            options: [
                { value: '1', text: '100% em renda fixa de baixo risco' },
                { value: '2', text: '80% em renda fixa e 20% em renda variável' },
                { value: '3', text: '60% em renda fixa e 40% em renda variável' },
                { value: '4', text: '40% em renda fixa e 60% em renda variável' },
                { value: '5', text: '20% em renda fixa e 80% em renda variável' }
            ],
            multiple: false
        },
        {
            id: 'question8',
            text: 'Qual percentual do seu patrimônio investido você pode manter sem necessidade de resgate por pelo menos 5 anos?',
            options: [
                { value: '1', text: 'Menos de 10%' },
                { value: '2', text: 'Entre 10% e 30%' },
                { value: '3', text: 'Entre 30% e 50%' },
                { value: '4', text: 'Entre 50% e 70%' },
                { value: '5', text: 'Mais de 70%' }
            ],
            multiple: false
        },
        {
            id: 'question9',
            text: 'Imagine que você tenha R$ 100.000 para investir. Qual das seguintes alternativas você escolheria?',
            options: [
                { value: '1', text: 'Investimento A: 100% de chance de ganhar R$ 5.000' },
                { value: '2', text: 'Investimento B: 80% de chance de ganhar R$ 7.500 e 20% de chance de não ganhar nada' },
                { value: '3', text: 'Investimento C: 50% de chance de ganhar R$ 15.000 e 50% de chance de perder R$ 2.000' },
                { value: '4', text: 'Investimento D: 30% de chance de ganhar R$ 30.000 e 70% de chance de perder R$ 5.000' },
                { value: '5', text: 'Investimento E: 10% de chance de ganhar R$ 100.000 e 90% de chance de perder R$ 10.000' }
            ],
            multiple: false
        },
        {
            id: 'question10',
            text: 'Independentemente das respostas anteriores, como você classificaria seu próprio perfil de investidor?',
            options: [
                { value: '1', text: 'Conservador: priorizo segurança e estou disposto a abrir mão de rentabilidade' },
                { value: '2', text: 'Moderadamente conservador: aceito pequenos riscos para melhorar a rentabilidade' },
                { value: '3', text: 'Moderado: busco equilíbrio entre segurança e rentabilidade' },
                { value: '4', text: 'Moderadamente arrojado: aceito riscos consideráveis em busca de retornos maiores' },
                { value: '5', text: 'Arrojado: priorizo rentabilidade e estou disposto a assumir riscos significativos' }
            ],
            multiple: false
        }
    ];
    
    let currentQuestion = 0;
    const answers = {};
    
    // Inicializar o formulário
    function initForm() {
        // Limpar o conteúdo anterior
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '';
        
        // Criar a primeira pergunta
        showQuestion(currentQuestion);
        
        // Atualizar a barra de progresso
        updateProgressBar();
    }
    
    // Mostrar uma pergunta específica
    function showQuestion(index) {
        if (index >= questions.length) {
            // Todas as perguntas foram respondidas
            submitForm();
            return;
        }
        
        const questionContainer = document.getElementById('question-container');
        questionContainer.innerHTML = '';
        
        const question = questions[index];
        
        // Criar o elemento da pergunta
        const questionElement = document.createElement('div');
        questionElement.className = 'question fade-in';
        
        // Título da pergunta
        const questionTitle = document.createElement('h3');
        questionTitle.className = 'question-title';
        questionTitle.textContent = `${index + 1}. ${question.text}`;
        questionElement.appendChild(questionTitle);
        
        // Opções
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options';
        
        question.options.forEach((option, optionIndex) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            const input = document.createElement('input');
            input.type = question.multiple ? 'checkbox' : 'radio';
            input.id = `${question.id}-option${optionIndex}`;
            input.name = question.id;
            input.value = option.value;
            
            // Verificar se já foi respondido
            if (!question.multiple && answers[question.id] === option.value) {
                input.checked = true;
            } else if (question.multiple && answers[question.id] && answers[question.id].includes(option.value)) {
                input.checked = true;
            }
            
            const label = document.createElement('label');
            label.htmlFor = `${question.id}-option${optionIndex}`;
            label.textContent = option.text;
            
            optionElement.appendChild(input);
            optionElement.appendChild(label);
            optionsContainer.appendChild(optionElement);
        });
        
        questionElement.appendChild(optionsContainer);
        
        // Botões de navegação
        const navigationButtons = document.createElement('div');
        navigationButtons.className = 'form-navigation';
        
        if (index > 0) {
            const prevButton = document.createElement('button');
            prevButton.type = 'button';
            prevButton.className = 'btn prev-btn';
            prevButton.textContent = 'Anterior';
            prevButton.addEventListener('click', () => {
                saveCurrentAnswer();
                currentQuestion--;
                showQuestion(currentQuestion);
                updateProgressBar();
            });
            navigationButtons.appendChild(prevButton);
        } else {
            // Espaço vazio para manter o alinhamento
            const emptyDiv = document.createElement('div');
            navigationButtons.appendChild(emptyDiv);
        }
        
        const nextButton = document.createElement('button');
        nextButton.type = 'button';
        nextButton.className = 'btn btn-primary next-btn';
        
        if (index === questions.length - 1) {
            nextButton.textContent = 'Calcular Perfil';
            nextButton.addEventListener('click', () => {
                if (validateCurrentAnswer()) {
                    saveCurrentAnswer();
                    submitForm();
                }
            });
        } else {
            nextButton.textContent = 'Próximo';
            nextButton.addEventListener('click', () => {
                if (validateCurrentAnswer()) {
                    saveCurrentAnswer();
                    currentQuestion++;
                    showQuestion(currentQuestion);
                    updateProgressBar();
                }
            });
        }
        
        navigationButtons.appendChild(nextButton);
        questionElement.appendChild(navigationButtons);
        
        questionContainer.appendChild(questionElement);
    }
    
    // Validar a resposta atual
    function validateCurrentAnswer() {
        const question = questions[currentQuestion];
        
        if (question.multiple) {
            const checkboxes = document.querySelectorAll(`input[name="${question.id}"]:checked`);
            if (checkboxes.length === 0) {
                alert('Por favor, selecione pelo menos uma opção antes de continuar.');
                return false;
            }
        } else {
            const radio = document.querySelector(`input[name="${question.id}"]:checked`);
            if (!radio) {
                alert('Por favor, selecione uma opção antes de continuar.');
                return false;
            }
        }
        
        return true;
    }
    
    // Salvar a resposta atual
    function saveCurrentAnswer() {
        const question = questions[currentQuestion];
        
        if (question.multiple) {
            const checkboxes = document.querySelectorAll(`input[name="${question.id}"]:checked`);
            answers[question.id] = Array.from(checkboxes).map(cb => cb.value);
        } else {
            const radio = document.querySelector(`input[name="${question.id}"]:checked`);
            if (radio) {
                answers[question.id] = radio.value;
            }
        }
    }
    
    // Atualizar a barra de progresso
    function updateProgressBar() {
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        mainProgressBar.style.width = `${progress}%`;
        document.getElementById('progress-text').textContent = `${currentQuestion + 1} de ${questions.length}`;
    }
    
    // Processar o formulário
    function submitForm() {
        // Mostrar loader
        document.querySelector('.form-container').style.display = 'none';
        loader.style.display = 'block';
        
        // Simular tempo de processamento
        setTimeout(() => {
            const result = calculateRiskProfile();
            displayResult(result);
            
            loader.style.display = 'none';
            resultContainer.style.display = 'block';
        }, 1500);
    }
    
    // Cálculo do perfil de risco
    function calculateRiskProfile() {
        // Processar respostas de múltipla escolha
        let processedAnswers = {};
        
        for (const [questionId, answer] of Object.entries(answers)) {
            if (Array.isArray(answer)) {
                // Para a pergunta 3 (múltipla escolha), calcular pontuação baseada nas opções selecionadas
                if (questionId === 'question3') {
                    // Mapear as opções para níveis de risco
                    const riskLevels = {
                        '1': 1, // Poupança (menor risco)
                        '2': 1, // CDB ou Tesouro Direto
                        '3': 2, // Fundos de renda fixa
                        '4': 2, // Títulos públicos
                        '5': 3, // Fundos multimercado
                        '6': 4, // Ações
                        '7': 4, // Fundos imobiliários
                        '8': 5, // Derivativos
                        '9': 5, // Operações alavancadas
                        '10': 5 // Investimentos no exterior
                    };
                    
                    // Pegar o maior nível de risco entre as opções selecionadas
                    let maxRiskLevel = 1;
                    answer.forEach(option => {
                        const riskLevel = riskLevels[option];
                        if (riskLevel > maxRiskLevel) {
                            maxRiskLevel = riskLevel;
                        }
                    });
                    
                    processedAnswers[questionId] = maxRiskLevel;
                } else {
                    // Para outras perguntas de múltipla escolha (se houver)
                    processedAnswers[questionId] = Math.max(...answer.map(a => parseInt(a)));
                }
            } else {
                // Para perguntas de escolha única
                processedAnswers[questionId] = parseInt(answer);
            }
        }
        
        // Aplicar pesos conforme a lógica de classificação
        const weightedScore = 
            (processedAnswers.question1 * 1.0) + // Horizonte de investimento
            (processedAnswers.question2 * 1.5) + // Conhecimento
            (processedAnswers.question3 * 1.5) + // Experiência
            (processedAnswers.question4 * 2.0) + // Tolerância a perdas
            (processedAnswers.question5 * 1.5) + // Objetivos
            (processedAnswers.question6 * 2.0) + // Comportamento
            (processedAnswers.question7 * 1.5) + // Composição
            (processedAnswers.question8 * 1.0) + // Liquidez
            (processedAnswers.question9 * 2.0) + // Situação hipotética
            (processedAnswers.question10 * 0.5); // Autoavaliação
        
        // Pontuação máxima possível: 50 pontos
        const maxScore = 50;
        const scorePercentage = (weightedScore / maxScore) * 100;
        
        // Determinar perfil com base na pontuação
        let profile;
        if (weightedScore <= 20) {
            profile = 'conservador';
        } else if (weightedScore <= 35) {
            profile = 'moderado';
        } else {
            profile = 'arrojado';
        }
        
        // Aplicar regras de segurança
        // Regra 1: Se horizonte < 1 ano, não pode ser arrojado
        if (processedAnswers.question1 === 1 && profile === 'arrojado') {
            profile = 'moderado';
        }
        
        // Regra 2: Se conhecimento e experiência baixos, limitar a moderado
        const knowledgeExperienceAvg = (processedAnswers.question2 + processedAnswers.question3) / 2;
        if (knowledgeExperienceAvg < 3 && profile === 'arrojado') {
            profile = 'moderado';
        }
        
        // Verificar consistência com autoavaliação
        const selfAssessment = processedAnswers.question10;
        let hasDiscrepancy = false;
        
        if (profile === 'conservador' && selfAssessment >= 4) {
            hasDiscrepancy = true;
        } else if (profile === 'arrojado' && selfAssessment <= 2) {
            hasDiscrepancy = true;
        } else if (profile === 'moderado' && (selfAssessment === 1 || selfAssessment === 5)) {
            hasDiscrepancy = true;
        }
        
        return {
            profile: profile,
            score: weightedScore,
            percentage: scorePercentage,
            hasDiscrepancy: hasDiscrepancy
        };
    }
    
    // Exibir resultado
    function displayResult(result) {
        // Definir nome do perfil
        let profileDisplayName;
        let profileText;
        
        switch(result.profile) {
            case 'conservador':
                profileDisplayName = 'CONSERVADOR';
                profileText = 'Você prioriza a segurança e a preservação do seu capital. Prefere investimentos com baixa volatilidade e está disposto a aceitar retornos menores em troca de maior estabilidade. Recomenda-se uma carteira com foco em renda fixa, como Tesouro Direto, CDBs, LCIs e LCAs, com pequena exposição a fundos multimercado de baixa volatilidade.';
                break;
            case 'moderado':
                profileDisplayName = 'MODERADO';
                profileText = 'Você busca um equilíbrio entre segurança e rentabilidade. Está disposto a assumir riscos moderados para obter retornos acima da média do mercado. Uma carteira diversificada com 60% em renda fixa e 40% em renda variável pode ser adequada, incluindo fundos multimercado, fundos imobiliários e uma exposição controlada a ações.';
                break;
            case 'arrojado':
                profileDisplayName = 'ARROJADO';
                profileText = 'Você prioriza a rentabilidade a longo prazo e está disposto a enfrentar a volatilidade do mercado. Compreende os riscos envolvidos e tem horizonte de investimento mais longo. Sua carteira pode ter maior exposição à renda variável (60-80%), incluindo ações, fundos de ações, investimentos no exterior e, possivelmente, pequenas alocações em ativos alternativos.';
                break;
        }
        
        // Adicionar aviso sobre discrepância, se houver
        if (result.hasDiscrepancy) {
            profileText += ' <strong>Observação:</strong> Notamos uma diferença entre sua autoavaliação e o resultado calculado com base nas suas respostas. Isso é normal e pode indicar uma oportunidade para refletir sobre sua real tolerância ao risco.';
        }
        
        // Atualizar elementos visuais
        profileName.textContent = profileDisplayName;
        profileName.className = 'result-profile profile-' + result.profile;
        profileDescription.innerHTML = profileText;
        
        // Atualizar barra de progresso
        progressBar.style.width = result.percentage + '%';
        progressMarker.style.left = result.percentage + '%';
    }
    
    // Reiniciar o teste
    restartBtn.addEventListener('click', function() {
        // Limpar respostas
        for (const key in answers) {
            delete answers[key];
        }
        
        // Resetar para a primeira pergunta
        currentQuestion = 0;
        
        // Esconder resultado e mostrar formulário
        resultContainer.style.display = 'none';
        document.querySelector('.form-container').style.display = 'block';
        
        // Reiniciar o formulário
        initForm();
    });
    
    // Inicializar o formulário
    initForm();
});
