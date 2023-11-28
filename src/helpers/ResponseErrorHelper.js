const handle400 = ({ res, error, msg }) => {
    console.error(error);
    res.status(400).json(ErrorArray(msg || 'Datos incorrectos'));
}

const handle401 = ({ res, error, msg }) => {
    console.error(error);
    res.status(401).json(ErrorArray(msg || 'Debe estar autenticado'));
}

const handle403 = ({ res, error, msg }) => {
    console.error(error);
    res.status(401).json(ErrorArray(msg || 'No se puede realizar la accion'));
}

const handle404 = ({ res, error, msg }) => {
    console.error(error);
    res.status(404).json(ErrorArray(msg || 'Datos no encontrados'));
}

const handle500 = ({ res, error, msg }) => {
    console.error("error: ",error);
    res.status(500).json(ErrorArray(msg || 'Error en el servidor'));
}
const ErrorArray = (msg) => {
    return { errors: [msg] };
}

module.exports = {
    handle400,
    handle401,
    handle403,
    handle404,
    handle500
}