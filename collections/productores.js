Productores = new Meteor.Collection('productores');

let ProductoresSchema = new SimpleSchema({
  zona: {
    type: String,
    label: 'Zona',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: '1', value: '1'},
          {label: '2', value: '2'},
          {label: '3', value: '3'},
          {label: '4', value: '4'},
          {label: '5', value: '5'},
          {label: '6', value: '6'},
          {label: '7', value: '7'},
          {label: 'INSULAR', value: 'INSULAR'}
        ];
      }
    }
  },
  provincia: {
    type: String,
    label: 'Provincia',
    autoform: {
      type: 'select',
      firstOption: '',
      options: function () {
        return DPA.find({grupo: 'Provincia'}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.descripcion};
        });
      }
    }
  },
  cuatrimestre: {
    type: String,
    label: 'Cuatrimestre',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: '1', value: '1'},
          {label: '2', value: '2'},
          {label: '3', value: '3'}
        ];
      }
    }
  },
  cedula: {
    type: String,
    label: 'Cédula',
    index: true,
    unique: true
  },
  genero: {
    type: String,
    label: 'Género',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: 'Hombre', value: 'Hombre'},
          {label: 'Mujer', value: 'Mujer'}
        ];
      }
    }
  },
  apellidos: {
    type: String,
    label: 'Apellidos'
  },
  nombres: {
    type: String,
    label: 'Nombres'
  },
  telefonoFijoContacto: {
    type: String,
    label: 'Teléfono fijo',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    },
    optional: true
  },
  celularContacto: {
    type: String,
    label: 'Teléfono celular',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    },
    optional: true
  },
  emailContacto: {
    type: String,
    label: 'Correo electrónico',
    regEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    optional: true
  },
  organizaciones: {
    type: [String],
    label: 'Organizaciones a las que pertenece',
    optional: true,
    autoform: {
      type: "select2",
      options: function () {
        return Organizaciones.find().map(function (organizacion) {
          return {label: organizacion.nombreOrganizacion, value: organizacion._id};
        });
      },
      afFieldInput: {
        multiple: true
      }
    }
  },
  cialcos: {
    type: [String],
    label: 'CIALCOs a los que perntenece',
    optional: true,
    autoform: {
      type: "select2",
      options: function () {
        return Cialcos.find().map(function (cialco) {
          return {label: cialco.nombreCialco, value: cialco._id};
        });
      },
      afFieldInput: {
        multiple: true
      }
    }
  },
  respaldo: {
    type: String,
    label: 'Respaldo',
    optional: true
  },
  anio: {
    type: Number,
    label: 'Año',
    autoValue: function () {
      var currentDate = new Date();
      var date = currentDate.getFullYear();
      if (this.isInsert) {
        return date;
      } else if (this.isUpsert) {
        return {$setOnInsert: date};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  createdAt: {
    type: String,
    label: 'Fecha de creación',
    autoValue: function () {
      var currentDate = new Date();
      var date = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);
      if (this.isInsert) {
        return date;
      } else if (this.isUpsert) {
        return {$setOnInsert: date};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  createdBy: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.userId();
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.userId()};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: true
  },
  responsable: {
    type: String,
    label: 'Responsable',
    autoValue: function () {
      if (this.isInsert) {
        return Meteor.users.findOne({_id: Meteor.userId()}).profile.name;
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.users.findOne({_id: Meteor.userId()}).profile.name};
      } else {
        this.unset();
      }
    },
    autoform: {
      type: 'hidden',
      label: false
    },
    optional: true
  }
});

Productores.attachSchema(ProductoresSchema);

TabularTables.Productores = new Tabular.Table({
  name: "Lista de productores",
  collection: Productores,
  columns: [
    {data: "zona", title: "Zona"},
    {data: "provincia", title: "Provincia"},
    {data: "cuatrimestre", title: "Cuatrimestre"},
    {data: "cedula", title: "Cédula"},
    {data: "apellidos", title: "Apellidos"},
    {data: "nombres", title: "Nombres"}
  ]
});
