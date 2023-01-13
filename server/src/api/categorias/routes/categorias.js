module.exports = {
  routes: [
    {
     method: 'GET',
     path: '/categorias',
     handler: 'categorias.categorias',
     config: {
       policies: [],
       middlewares: [],
     },
    },
  ],
};
