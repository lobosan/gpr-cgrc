Cialcos = new Meteor.Collection('cialcos');

let CialcosSchema = new SimpleSchema({
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
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  canton: {
    type: String,
    label: 'Cantón',
    autoform: {
      type: 'select',
      firstOption: '',
      options: function () {
        var codigoProvincia = AutoForm.getFieldValue('provincia');
        var cantones = new RegExp('^' + codigoProvincia + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: cantones}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  localidad: {
    type: String,
    label: 'Localidad'
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
  modalidad: {
    type: String,
    label: 'Modalidad',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: 'Feria', value: 'Feria'},
          {label: 'Canasta', value: 'Canasta'},
          {label: 'Canasta institucional', value: 'Canasta institucional'},
          {label: 'Pie de finca', value: 'Pie de finca'},
          {label: 'Tienda', value: 'Tienda'},
          {label: 'Compra pública', value: 'Compra pública'},
          {label: 'Catering', value: 'Catering'},
          {label: 'Otro', value: 'Otro'}
        ];
      }
    }
  },
  estado: {
    type: String,
    label: 'Estado',
    autoform: {
      type: 'select-radio-inline',
      options: function () {
        return [
          {label: 'Nuevo', value: 'Nuevo'},
          {label: 'Fortalecido', value: 'Fortalecido'}
        ];
      }
    }
  },
  nombreCialco: {
    type: String,
    label: 'Nombre del CIALCO'
  },
  nombreRepresentante: {
    type: String,
    label: 'Representante del circuito'
  },
  telefonoFijoRepresentante: {
    type: String,
    label: 'Teléfono fijo del representante',
    regEx: /^0[2-7]{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '02-000-0000'
    },
    optional: true
  },
  celularRepresentante: {
    type: String,
    label: 'Teléfono celular del representante',
    regEx: /^0[8-9]{1}\d{1}-?\d{3}-?\d{4}$/,
    autoform: {
      placeholder: '090-000-0000'
    },
    optional: true
  },
  emailRepresentante: {
    type: String,
    label: 'Correo electrónico del representante',
    regEx: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    optional: true
  },
  hombresCialco: {
    type: Number,
    label: 'Hombres vinculados al CIALCO'
  },
  mujeresCialco: {
    type: Number,
    label: 'Mujeres vinculadas al CIALCO'
  },
  totalProductoresCialco: {
    type: Number,
    label: 'Total de productores vinculados al CIALCO'
  },
  observaciones: {
    type: String,
    label: 'Observaciones',
    autoform: {
      rows: 4
    }
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
        return Meteor.users.findOne().profile.name;
      } else if (this.isUpsert) {
        return {$setOnInsert: Meteor.users.findOne().profile.name};
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

Cialcos.attachSchema(CialcosSchema);

TabularTables.Cialcos = new Tabular.Table({
  name: "Lista de cialcos",
  collection: Cialcos,
  columns: [
    {data: "zona", title: "Zona"},
    {data: "provincia", title: "Provincia"},
    {data: "canton", title: "Cantón"},
    {data: "cuatrimestre", title: "Cuatrimestre"},
    {data: "modalidad", title: "Modalidad"},
    {data: "cialco", title: "CIALCO"},
    {data: "nombreRepresentante", title: "Representante"}
  ]
});
