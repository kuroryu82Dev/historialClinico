let pacienteEditarIndex = null;

const setValor = (id, valor) => {
    const elemento = document.getElementById(id);
    if (!elemento) return;
    elemento.value = valor ?? '';
}

const obtenerPacienteFormulario = () => ({
    nombre: document.getElementById('nombre')?.value || '',
    paterno: document.getElementById('paterno')?.value || '',
    materno: document.getElementById('materno')?.value || '',
    curp: document.getElementById('curp')?.value || '',
    RFC: document.getElementById('RFC')?.value || '',
    fechaNacimiento: document.getElementById('fechaNacimiento')?.value || '',
    sexo: document.getElementById('sexo-menu')?.value || '',
    estadoCivil: document.getElementById('estadoCivil-menu')?.value || '',
    calle: document.getElementById('calle')?.value || '',
    numero: document.getElementById('numero')?.value || '',
    colonia: document.getElementById('colonia')?.value || '',
    municipio: document.getElementById('municipio')?.value || '',
    estado: document.getElementById('estado')?.value || '',
    cp: document.getElementById('cp')?.value || '',
    telefono: document.getElementById('telefono')?.value || '',
    email: document.getElementById('email')?.value || '',
    tipoSangre: document.getElementById('tipoSangre-menu')?.value || '',
    alergias: document.getElementById('alergias')?.value || '',
    ocupacion: document.getElementById('ocupacion')?.value || '',
    escolaridad: document.getElementById('escolaridad-menu')?.value || '',
    numeroAfiliacion: document.getElementById('numeroAfiliacion')?.value || '',
    institucion: document.getElementById('institucion-menu')?.value || '',
    nombreResponsable: document.getElementById('nombreResponsable')?.value || '',
    parentesco: document.getElementById('parentesco')?.value || '',
    telefonoResponsable: document.getElementById('telefonoResponsable')?.value || ''
});

const cargarPacienteEdicion = () => {
    const indexRaw = localStorage.getItem('pacienteEditarIndex');
    if (indexRaw == null) return;

    const index = Number(indexRaw);
    const pacientesGuardados = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const paciente = pacientesGuardados[index];

    if (!Number.isInteger(index) || !paciente) {
        localStorage.removeItem('pacienteEditarIndex');
        return;
    }

    pacienteEditarIndex = index;

    setValor('nombre', paciente.nombre);
    setValor('paterno', paciente.paterno);
    setValor('materno', paciente.materno);
    setValor('curp', paciente.curp);
    setValor('RFC', paciente.RFC);
    setValor('fechaNacimiento', paciente.fechaNacimiento);
    setValor('sexo-menu', paciente.sexo);
    setValor('estadoCivil-menu', paciente.estadoCivil);
    setValor('calle', paciente.calle);
    setValor('numero', paciente.numero);
    setValor('colonia', paciente.colonia);
    setValor('municipio', paciente.municipio);
    setValor('estado', paciente.estado);
    setValor('cp', paciente.cp);
    setValor('telefono', paciente.telefono);
    setValor('email', paciente.email);
    setValor('tipoSangre-menu', paciente.tipoSangre);
    setValor('alergias', paciente.alergias);
    setValor('ocupacion', paciente.ocupacion);
    setValor('escolaridad-menu', paciente.escolaridad);
    setValor('numeroAfiliacion', paciente.numeroAfiliacion);
    setValor('institucion-menu', paciente.institucion);
    setValor('nombreResponsable', paciente.nombreResponsable);
    setValor('parentesco', paciente.parentesco);
    setValor('telefonoResponsable', paciente.telefonoResponsable);

    const titulo = document.querySelector('.titulo-formulario');
    const submitBtn = document.getElementById('submitPacienteBtn');
    if (titulo) titulo.textContent = 'Actualizar registro clínico del paciente';
    if (submitBtn) submitBtn.textContent = 'Actualizar';
}

ObtieneCatSexo = async () => {
    try {

        const catSexoSelect = document.getElementById('sexo-menu');
        const catSexo = await fetch('../json/catSexo.json');
        const catSexoJson = await catSexo.json();

        catSexoJson.forEach(item => {
            const optionItem = document.createElement('option');
            optionItem.value = item.id;
            optionItem.textContent = item.descripcion;
            catSexoSelect.appendChild(optionItem);
        });
    }
    catch (error) {
        console.error('Error al cargar el catálogo de sexo:', error);
    }
}

ObtieneEstadoCivil = async () => {
    try {
        const estadoCivilSelect = document.getElementById('estadoCivil-menu');
        const estadoCivil = await fetch('../json/catEstadoCivil.json');
        const estadoCivilJson = await estadoCivil.json();

        estadoCivilJson.forEach(item => {
            const optionItem = document.createElement('option');
            optionItem.value = item.id;
            optionItem.textContent = item.descripcion;
            estadoCivilSelect.appendChild(optionItem);
        });
    }
    catch (error) {
        console.error('Error al cargar el catálogo de estado civil:', error);
    }
}

ObtieneTipoSangre = async () => {
    try {
        const tipoSangreSelect = document.getElementById('tipoSangre-menu');
        const tipoSangre = await fetch('../json/catTipoSangre.json');
        const tipoSangreJson = await tipoSangre.json();

        tipoSangreJson.forEach(item => {
            const optionItem = document.createElement('option');
            optionItem.value = item.id;
            optionItem.textContent = item.descripcion;
            tipoSangreSelect.appendChild(optionItem);
        });
    }
    catch (error) {
        console.error('Error al cargar el catálogo de tipo de sangre:', error);
    }
}

ObtieneCatEscolaridad = async () => {
    try {
        const escolaridadSelect = document.getElementById('escolaridad-menu');
        const escolaridad = await fetch('../json/catEcolaridad.json');
        const escolaridadJson = await escolaridad.json();

        escolaridadJson.forEach(item => {
            const optionItem = document.createElement('option');
            optionItem.value = item.id;
            optionItem.textContent = item.descripcion;
            escolaridadSelect.appendChild(optionItem);
        });
    }
    catch (error) {
        console.error('Error al cargar el catálogo de escolaridad:', error);
    }
}

ObtieneInstitucionSeguridad = async () => {
    try {
        const institucionSelect = document.getElementById('institucion-menu');
        const institucion = await fetch('../json/catInstitutoSocial.json');
        const institucionJson = await institucion.json();

        institucionJson.forEach(item => {
            const optionItem = document.createElement('option');
            optionItem.value = item.id;
            optionItem.textContent = item.descripcion;
            institucionSelect.appendChild(optionItem);
        });
    }
    catch (error) {
        console.error('Error al cargar el catálogo de instituciones de seguridad:', error);
    }
}

RegistrarPacientes = (event) => {
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }

    const formulario = document.getElementById('registro-form');
    if (!formulario) {
        console.error('No se encontró el formulario de registro.');
        Swal.fire({
            title: 'Error',
            text: 'No se encontró el formulario de registro.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
        return;
    }

    const pacientesGuardados = JSON.parse(localStorage.getItem('pacientes') || '[]');
    const pacienteBase = obtenerPacienteFormulario();

    if (pacienteEditarIndex != null && pacientesGuardados[pacienteEditarIndex]) {
        const pacienteAnterior = pacientesGuardados[pacienteEditarIndex];
        pacientesGuardados[pacienteEditarIndex] = {
            ...pacienteBase,
            fechaRegistro: pacienteAnterior.fechaRegistro || new Date().toISOString(),
            fechaActualizacion: new Date().toISOString()
        };
        localStorage.setItem('pacientes', JSON.stringify(pacientesGuardados, null, 2));
        localStorage.removeItem('pacienteEditarIndex');

        Swal.fire({
            title: 'Paciente actualizado',
            text: 'El paciente se actualizó exitosamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            window.location.href = '../template/listaPacientes.html';
        });
        return;
    }

    const pacienteNuevo = {
        ...pacienteBase,
        fechaRegistro: new Date().toISOString()
    };

    pacientesGuardados.push(pacienteNuevo);
    localStorage.setItem('pacientes', JSON.stringify(pacientesGuardados, null, 2));

    Swal.fire({
        title: 'Paciente registrado',
        text: 'El paciente ha sido registrado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    formulario.reset();
    console.log('Pacientes guardados:', pacientesGuardados);
}

//Una forma de llamar a las funciones de carga de catálogos al cargar la página
// window.addEventListener('DOMContentLoaded',ObtieneCatSexo);
// window.addEventListener('DOMContentLoaded',ObtieneEstadoCivil);
// window.addEventListener('DOMContentLoaded',ObtieneTipoSangre);
// window.addEventListener('DOMContentLoaded',ObtieneCatEscolaridad);
// window.addEventListener('DOMContentLoaded',ObtieneInstitucionSeguridad);

//Otra forma de llamar a las funciones de carga de catálogos al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('registro-form');
    if (formulario) {
        formulario.addEventListener('submit', RegistrarPacientes);
    }

    Promise.all([
        ObtieneCatSexo(),
        ObtieneEstadoCivil(),
        ObtieneTipoSangre(),
        ObtieneCatEscolaridad(),
        ObtieneInstitucionSeguridad()
    ]).then(() => {
        cargarPacienteEdicion();
    });
});
