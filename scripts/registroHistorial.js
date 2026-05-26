let doctoresCatalogo = [];

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


ObtieneCatDoctores = async () => {
    try {
        const doctorSelect = document.getElementById('medico-menu');
        const doctores = await fetch('../json/catDoctores.json');
        doctoresCatalogo = await doctores.json();

        doctoresCatalogo.forEach(item => {
            const optionItem = document.createElement('option');
            optionItem.value = item.id;
            optionItem.textContent = item.nombre;
            doctorSelect.appendChild(optionItem);
        });
    }
    catch (error) {
        console.error('Error al cargar el catálogo de doctores:', error);
    }
}

LlenarCedulaPorMedico = () => {
    const doctorSelect = document.getElementById('medico-menu');
    const cedulaInput = document.getElementById('cedula');
    if (!doctorSelect || !cedulaInput) return;

    const doctorSeleccionado = doctoresCatalogo.find((doctor) => String(doctor.id) === String(doctorSelect.value));
    cedulaInput.value = doctorSeleccionado?.cedula || '';
}

ObtieneCatServicios = async () => {
    try {
        const servicioSelect = document.getElementById('servicio-menu');
        const servicios = await fetch('../json/catServicios.json');
        const serviciosJson = await servicios.json();

        serviciosJson.forEach(item => {
            const optionItem = document.createElement('option');
            optionItem.value = item.id;
            optionItem.textContent = item.nombre;
            servicioSelect.appendChild(optionItem);
        });
    }
    catch (error) {
        console.error('Error al cargar el catálogo de servicios:', error);
    }
}

ObtenerValor = (id) => {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

ObtenerHistorialFormulario = () => ({
    nombre: ObtenerValor('nombre'),
    paterno: ObtenerValor('paterno'),
    materno: ObtenerValor('materno'),
    curp: ObtenerValor('curp'),
    RFC: ObtenerValor('RFC'),
    fechaNacimiento: ObtenerValor('fechaNacimiento'),
    sexo: ObtenerValor('sexo-menu'),
    ocupacion: ObtenerValor('ocupacion'),
    nombreResponsable: ObtenerValor('nombreResponsable'),
    parentesco: ObtenerValor('parentesco'),
    curpTutor: ObtenerValor('curpTutor'),
    telefonoResponsable: ObtenerValor('telefonoResponsable'),
    identificacion: ObtenerValor('identificacion'),
    fechaConsulta: ObtenerValor('fechaConsulta'),
    servicio: ObtenerValor('servicio-menu'),
    medicoResponsable: ObtenerValor('medico-menu'),
    cedula: ObtenerValor('cedula'),
    motivoConsulta: ObtenerValor('motivoConsulta'),
    antecedentesFamiliares: ObtenerValor('antecedentesFamiliares'),
    antecedentesPersonales: ObtenerValor('antecedentesPersonales'),
    antecedentesNoPatologicos: ObtenerValor('antecedentesNoPatologicos'),
    menarquia: ObtenerValor('menarquia'),
    cicloMenstrual: ObtenerValor('cicloMenstrual'),
    fum: ObtenerValor('fum'),
    gestas: ObtenerValor('gestas'),
    partos: ObtenerValor('partos'),
    cesareas: ObtenerValor('cesareas'),
    abortos: ObtenerValor('abortos'),
    metodoAnticonceptivo: ObtenerValor('metodoAnticonceptivo'),
    observacionesGinecologicas: ObtenerValor('observacionesGinecologicas')
});

GuardarHistorialClinico = (event) => {
    event.preventDefault();

    const historialNuevo = {
        ...ObtenerHistorialFormulario(),
        fechaRegistro: new Date().toISOString()
    };

    const historialesGuardados = JSON.parse(localStorage.getItem('historialesClinicos') || '[]');
    historialesGuardados.push(historialNuevo);
    localStorage.setItem('historialesClinicos', JSON.stringify(historialesGuardados, null, 2));

    Swal.fire({
        title: 'Historial guardado',
        text: 'La información del paciente se guardó correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

window.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        ObtieneCatSexo(),
        ObtieneCatDoctores(),
        ObtieneCatServicios()
    ]).then(() => {
        if (typeof cargarPacienteEdicion === 'function') {
            cargarPacienteEdicion();
        }
    });

    const formulario = document.getElementById('registro-form');
    if (formulario) {
        formulario.addEventListener('submit', GuardarHistorialClinico);
    }

    const medicoMenu = document.getElementById('medico-menu');
    if (medicoMenu) {
        medicoMenu.addEventListener('change', LlenarCedulaPorMedico);
    }
});
