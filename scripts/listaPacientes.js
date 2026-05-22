let tipoSangreMap = {};
let escolaridadMap = {};
let institucionMap = {};
let estadoCivilMap = {};
let catSexoMap = {};
let pacienteSeleccionadoIndex = null;
let pacientesGuardados = [];
let textoBusquedaPaciente = '';

ObtieneListaPacientes = async () => {
    await ObtieneTipoSangre();
    await ObtieneCatEscolaridad();
    await ObtieneInstitucionSeguridad();
    await ObtieneEstadoCivil();
    await ObtieneCatSexo();

    pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || [];
    renderTablaPacientes();
}

const renderTablaPacientes = () => {
    let bodyTabla = document.getElementById('pacientes-table-body');
    bodyTabla.innerHTML = '';

    const termino = textoBusquedaPaciente.trim().toLowerCase();
    const pacientesFiltrados = pacientesGuardados
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => {
            if (!termino) return true;
            const textoCompleto = [
                item.nombre,
                item.paterno,
                item.materno,
                item.curp,
                item.RFC,
                item.telefono,
                item.email
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();
            return textoCompleto.includes(termino);
        });

    if (pacientesFiltrados.length === 0) {
        bodyTabla.innerHTML = `
            <tr>
                <td colspan="11" class="text-center py-3">No se encontraron pacientes con ese criterio.</td>
            </tr>
        `;
        return;
    }

    pacientesFiltrados.forEach(({ item, index }) => {
        const tipoSangreTexto = ObtieneDescripcionTipoSangre(item.tipoSangre);
        const escolaridadTexto = ObtieneDescripcionEscolaridad(item.escolaridad);
        const institucionTexto = ObtieneDescripcionInstitucion(item.institucion);
        const estadoCivilTexto = ObtieneDescripcionEstadoCivil(item.estadoCivil);
        const sexoTexto = ObtieneDescripcionSexo(item.sexo);

        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.nombre}</td>
            <td>${item.paterno}</td>
            <td>${item.materno}</td>
            <td>${item.fechaNacimiento}</td>
            <td>${sexoTexto}</td>
            <td>${tipoSangreTexto}</td>
            <td>${estadoCivilTexto}</td>
            <td>${item.telefono}</td>
            <td>${item.email}</td>
            <td>${institucionTexto}</td>
            <td>
                <button type="button" class="btn btn-sm btn-primary ver-detalles-btn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#pacienteModal">
                    Ver
                </button>
                <button type="button" class="btn btn-sm btn-danger borrar-paciente-btn" data-index="${index}">
                    Borrar
                </button>
            </td>
        `;
        bodyTabla.appendChild(fila);
    });
}

const mostrarModalPaciente = (paciente) => {
    if (!paciente) return;

    document.getElementById('modalPacienteNombre').textContent = `${paciente.nombre} ${paciente.paterno} ${paciente.materno}`;
    const tipoSangreTexto = ObtieneDescripcionTipoSangre(paciente.tipoSangre);
    const escolaridadTexto = ObtieneDescripcionEscolaridad(paciente.escolaridad);
    const institucionTexto = ObtieneDescripcionInstitucion(paciente.institucion);
    const estadoCivilTexto = ObtieneDescripcionEstadoCivil(paciente.estadoCivil);
    const sexoTexto = ObtieneDescripcionSexo(paciente.sexo);

    document.getElementById('modalPacienteDatos').innerHTML = `
        <li class="list-group-item"><strong>Fecha de Nacimiento:</strong> ${paciente.fechaNacimiento || '-'}</li>
        <li class="list-group-item"><strong>Sexo:</strong> ${sexoTexto}</li>
        <li class="list-group-item"><strong>Tipo de sangre:</strong> ${tipoSangreTexto}</li>
        <li class="list-group-item"><strong>Estado civil:</strong> ${estadoCivilTexto}</li>
        <li class="list-group-item"><strong>Teléfono:</strong> ${paciente.telefono || '-'}</li>
        <li class="list-group-item"><strong>Correo:</strong> ${paciente.email || '-'}</li>
        <li class="list-group-item"><strong>Institución:</strong> ${institucionTexto || '-'}</li>
        <li class="list-group-item"><strong>CURP:</strong> ${paciente.curp || '-'}</li>
        <li class="list-group-item"><strong>RFC:</strong> ${paciente.RFC || '-'}</li>
        <li class="list-group-item"><strong>Dirección:</strong> ${paciente.calle || '-'}, ${paciente.numero || '-'}, ${paciente.colonia || '-'}, ${paciente.municipio || '-'}, ${paciente.estado || '-'}, CP ${paciente.cp || '-'}</li>
        <li class="list-group-item"><strong>Ocupación:</strong> ${paciente.ocupacion || '-'}</li>
        <li class="list-group-item"><strong>Escolaridad:</strong> ${escolaridadTexto || '-'}</li>
        <li class="list-group-item"><strong>Responsable:</strong> ${paciente.nombreResponsable || '-'} (${paciente.parentesco || '-'})</li>
        <li class="list-group-item"><strong>Teléfono responsable:</strong> ${paciente.telefonoResponsable || '-'}</li>
    `;
}

ObtieneTipoSangre = async () => {
    try {
        const tipoSangre = await fetch('../json/catTipoSangre.json');
        const tipoSangreJson = await tipoSangre.json();

        tipoSangreMap = tipoSangreJson.reduce((map, item) => {
            map[String(item.id)] = item.descripcion;
            return map;
        }, {});

        return tipoSangreJson;
    }
    catch (error) {
        console.error('Error al cargar el catálogo de tipo de sangre:', error);
    }
}

ObtieneCatEscolaridad = async () => {
    try {
        
        const escolaridad = await fetch('../json/catEcolaridad.json');
        const escolaridadJson = await escolaridad.json();

        escolaridadMap = escolaridadJson.reduce((map, item) => {
            map[String(item.id)] = item.descripcion;
            return map;
        }, {});
    }
    catch (error) {
        console.error('Error al cargar el catálogo de escolaridad:', error);
    }
}

ObtieneInstitucionSeguridad = async () => {
    try {

        const institucion = await fetch('../json/catInstitutoSocial.json');
        const institucionJson = await institucion.json();

        institucionMap = institucionJson.reduce((map, item) => {
            map[String(item.id)] = item.descripcion;
            return map;
        }, {});
    }
    catch (error) {
        console.error('Error al cargar el catálogo de instituciones de seguridad:', error);
    }
}

ObtieneEstadoCivil = async () => {
    try {

        const estadoCivil = await fetch('../json/catEstadoCivil.json');
        const estadoCivilJson = await estadoCivil.json();

        estadoCivilMap = estadoCivilJson.reduce((map, item) => {
            map[String(item.id)] = item.descripcion;
            return map;
        }, {});
    }
    catch (error) {
        console.error('Error al cargar el catálogo de estado civil:', error);
    }
}

ObtieneCatSexo = async () => {
    try {

        const catSexo = await fetch('../json/catSexo.json');
        const catSexoJson = await catSexo.json();

        catSexoMap = catSexoJson.reduce((map, item) => {
            map[String(item.id)] = item.descripcion;
            return map;
        }, {});

    }
    catch (error) {
        console.error('Error al cargar el catálogo de estado civil:', error);
    }
}


ObtieneDescripcionTipoSangre = (tipoSangreId) => {
    if (tipoSangreId == null) return '-';
    const key = String(tipoSangreId);
    return tipoSangreMap[key] || tipoSangreMap[Number(key)] || tipoSangreId || '-';
}

ObtieneDescripcionEscolaridad = (escolaridadId) => {
    if (escolaridadId == null) return '-';
    const key = String(escolaridadId);
    return escolaridadMap[key] || escolaridadMap[Number(key)] || escolaridadId || '-';
}

ObtieneDescripcionInstitucion = (institucionId) => {
    if (institucionId == null) return '-';
    const key = String(institucionId);
    return institucionMap[key] || institucionMap[Number(key)] || institucionId || '-';
}

ObtieneDescripcionEstadoCivil = (estadoCivilId) => {
    if (estadoCivilId == null) return '-';
    const key = String(estadoCivilId);
    return estadoCivilMap[key] || estadoCivilMap[Number(key)] || estadoCivilId || '-';
}
ObtieneDescripcionSexo = (sexoId) => {
    if (sexoId == null) return '-';
    const key = String(sexoId);
    return catSexoMap[key] || catSexoMap[Number(key)] || sexoId || '-';
}

window.addEventListener('DOMContentLoaded', ()=>{
    ObtieneListaPacientes();

    const bodyTabla = document.getElementById('pacientes-table-body');
    const modificarBtn = document.getElementById('modalModificarBtn');
    bodyTabla.addEventListener('click', (event) => {
    
    const borrarBtn = event.target.closest('.borrar-paciente-btn');
    if (borrarBtn) {
        const index = Number(borrarBtn.dataset.index);
        pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || [];
        const paciente = pacientesGuardados[index];

        Swal.fire({
            title: '¿Borrar paciente?',
            text: `Se eliminará el registro de ${paciente?.nombre || ''} ${paciente?.paterno || ''}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (!result.isConfirmed) return;
            pacientesGuardados.splice(index, 1);
            localStorage.setItem('pacientes', JSON.stringify(pacientesGuardados, null, 2));
            renderTablaPacientes();
            Swal.fire({
                title: 'Registro eliminado',
                text: 'El paciente fue eliminado exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });
        });
        return;
    }

    const button = event.target.closest('.ver-detalles-btn');
    
    if (!button) return;

    const index = Number(button.dataset.index);
    pacienteSeleccionadoIndex = index;
    pacientesGuardados = JSON.parse(localStorage.getItem('pacientes')) || [];
    
    mostrarModalPaciente(pacientesGuardados[index]);
    });

    if (modificarBtn) {
        modificarBtn.addEventListener('click', () => {
            if (pacienteSeleccionadoIndex == null) return;
            localStorage.setItem('pacienteEditarIndex', String(pacienteSeleccionadoIndex));
            window.location.href = '../template/registro.html?modo=editar';
        });
    }

    const buscarPacienteInput = document.getElementById('buscarPacienteInput');
    if (buscarPacienteInput) {
        buscarPacienteInput.addEventListener('input', (event) => {
            textoBusquedaPaciente = event.target.value || '';
            renderTablaPacientes();
        });
    }
});
