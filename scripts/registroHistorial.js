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

obtenerValor = (id) => {
    const element = document.getElementById(id);
    return element ? element.value.trim() : '';
}

cobtenerHistorialFormulario = () => ({
    nombre: obtenerValor('nombre'),
    paterno: obtenerValor('paterno'),
    materno: obtenerValor('materno'),
    curp: obtenerValor('curp'),
    RFC: obtenerValor('RFC'),
    fechaNacimiento: obtenerValor('fechaNacimiento'),
    sexo: obtenerValor('sexo-menu'),
    ocupacion: obtenerValor('ocupacion'),
    nombreResponsable: obtenerValor('nombreResponsable'),
    parentesco: obtenerValor('parentesco'),
    curpTutor: obtenerValor('curpTutor'),
    telefonoResponsable: obtenerValor('telefonoResponsable'),
    identificacion: obtenerValor('identificacion'),
    fechaConsulta: obtenerValor('fechaConsulta'),
    servicio: obtenerValor('servicio-menu'),
    medicoResponsable: obtenerValor('medico-menu'),
    cedula: obtenerValor('cedula'),
    motivoConsulta: obtenerValor('motivoConsulta'),
    antecedentesFamiliares: obtenerValor('antecedentesFamiliares'),
    antecedentesPersonales: obtenerValor('antecedentesPersonales'),
    antecedentesNoPatologicos: obtenerValor('antecedentesNoPatologicos'),
    menarquia: obtenerValor('menarquia'),
    cicloMenstrual: obtenerValor('cicloMenstrual'),
    fum: obtenerValor('fum'),
    gestas: obtenerValor('gestas'),
    partos: obtenerValor('partos'),
    cesareas: obtenerValor('cesareas'),
    abortos: obtenerValor('abortos'),
    metodoAnticonceptivo: obtenerValor('metodoAnticonceptivo'),
    observacionesGinecologicas: obtenerValor('observacionesGinecologicas')
});

GuardarHistorialClinico = (event) => {
    event.preventDefault();

    const historialNuevo = {
        ...obtenerHistorialFormulario(),
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
    ]).then(() => {
        if (typeof cargarPacienteEdicion === 'function') {
            cargarPacienteEdicion();
        }
    });

    const formulario = document.getElementById('registro-form');
    if (formulario) {
        formulario.addEventListener('submit', GuardarHistorialClinico);
    }
});
