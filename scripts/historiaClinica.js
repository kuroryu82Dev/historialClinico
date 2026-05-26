let historialesClinicos = [];
let textoBusqueda = '';

const valor = (v) => v || '-';

const renderHistoriales = () => {
    const tbody = document.getElementById('pacientes-table-body');
    if (!tbody) return;

    const termino = textoBusqueda.trim().toLowerCase();
    const filtrados = historialesClinicos.filter((item) => {
        if (!termino) return true;
        const base = [
            item.nombre,
            item.paterno,
            item.materno,
            item.curp,
            item.RFC,
            item.motivoConsulta,
            item.antecedentesFamiliares,
            item.antecedentesPersonales,
            item.observacionesGinecologicas
        ].filter(Boolean).join(' ').toLowerCase();
        return base.includes(termino);
    });

    tbody.innerHTML = '';

    if (filtrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="11" class="text-center py-3">No hay historiales clinicos para mostrar.</td></tr>';
        return;
    }

    filtrados.forEach((item) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${valor(item.fechaConsulta)}</td>
            <td>${valor(item.nombre)}</td>
            <td>${valor(item.paterno)}</td>
            <td>${valor(item.materno)}</td>
            <td>${valor(item.motivoConsulta)}</td>
            <td>${valor(item.antecedentesFamiliares)}</td>
            <td>${valor(item.antecedentesPersonales)}</td>
            <td>${valor(item.antecedentesNoPatologicos)}</td>
            <td>${valor(item.metodoAnticonceptivo)}</td>
            <td>${valor(item.observacionesGinecologicas)}</td>
            <td>${valor(item.fechaRegistro)}</td>
        `;
        tbody.appendChild(tr);
    });
};

window.addEventListener('DOMContentLoaded', () => {
    historialesClinicos = JSON.parse(localStorage.getItem('historialesClinicos') || '[]');
    renderHistoriales();

    const buscarInput = document.getElementById('buscarPacienteInput');
    if (buscarInput) {
        buscarInput.addEventListener('input', (event) => {
            textoBusqueda = event.target.value || '';
            renderHistoriales();
        });
    }
});
