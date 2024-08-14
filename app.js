document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const noteForm = document.getElementById('note-form');
    const noteDateInput = document.getElementById('noteDate');
    const noteTextInput = document.getElementById('noteText');
    const cancelNoteButton = document.getElementById('cancelNote');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const notes = {}; // Armazena as notas no formato { 'yyyy-mm-dd': 'nota' }
    const holidays = { // Lista de feriados
        '2024-01-01': 'Ano Novo',
        '2024-02-12': 'Carnaval',
        '2024-04-21': 'Tiradentes',
        '2024-05-01': 'Dia do Trabalhador',
        '2024-06-15': 'Corpus Christi',
        '2024-09-07': 'Independência do Brasil',
        '2024-10-12': 'Nossa Senhora Aparecida',
        '2024-11-02': 'Finados',
        '2024-11-15': 'Proclamação da República',
        '2024-12-25': 'Natal',
        '2024-08-15': 'Feriado Nacional' // Adicione outros feriados específicos se necessário
    };
    const events = { // Lista de eventos
        '2024-08-12': 'Evento Especial'
    };

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function generateCalendar() {
        calendar.innerHTML = ''; // Limpa o calendário

        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

        // Cria cabeçalhos dos dias da semana
        days.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.classList.add('day-header');
            dayHeader.textContent = day;
            calendar.appendChild(dayHeader);
        });

        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Adiciona células vazias para dias antes do primeiro dia do mês
        for (let i = 0; i < firstDay; i++) {
            const emptyCell = document.createElement('div');
            calendar.appendChild(emptyCell);
        }

        // Adiciona células com dias do mês
        for (let i = 1; i <= lastDate; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-cell');
            dayCell.textContent = i;

            // Data do dia atual
            const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

            // Adiciona tooltip para feriados e eventos
            if (holidays[dateString]) {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip', 'feriado');
                tooltip.textContent = holidays[dateString];
                dayCell.appendChild(tooltip);
                dayCell.classList.add('feriado');
            }

            if (events[dateString]) {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip', 'evento');
                tooltip.textContent = events[dateString];
                dayCell.appendChild(tooltip);
                dayCell.classList.add('evento');
            }

            // Adiciona nota se existir
            if (notes[dateString]) {
                const note = document.createElement('div');
                note.classList.add('note');
                note.textContent = notes[dateString];
                dayCell.appendChild(note);
            }

            // Adiciona evento de clique para adicionar nota
            dayCell.addEventListener('click', () => {
                noteDateInput.value = dateString;
                noteTextInput.value = notes[dateString] || '';
                noteForm.classList.remove('hidden');
            });

            calendar.appendChild(dayCell);
        }

        // Atualiza o cabeçalho com o mês e o ano
        monthYear.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
    }

    function addNote() {
        const date = noteDateInput.value;
        const text = noteTextInput.value;
        if (date && text) {
            notes[date] = text;
            alert('Nota salva!');
            noteDateInput.value = '';
            noteTextInput.value = '';
            noteForm.classList.add('hidden');
            generateCalendar(); // Atualiza o calendário para mostrar a nova nota
        }
    }

    function cancelNote() {
        noteForm.classList.add('hidden');
        noteDateInput.value = '';
        noteTextInput.value = '';
    }

    prevMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        currentYear = (currentMonth === 11) ? currentYear - 1 : currentYear;
        generateCalendar();
    });

    nextMonthButton.addEventListener('click', () => {
        currentMonth = (currentMonth === 11) ? 0 : currentMonth + 1;
        currentYear = (currentMonth === 0) ? currentYear + 1 : currentYear;
        generateCalendar();
    });

    document.getElementById('noteForm').addEventListener('submit', (e) => {
        e.preventDefault();
        addNote();
    });

    cancelNoteButton.addEventListener('click', () => {
        cancelNote();
    });

    generateCalendar(); // Inicializa o calendário ao carregar a página
});
