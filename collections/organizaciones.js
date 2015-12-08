Organizaciones = new Meteor.Collection('organizaciones');

let OrganizacionesSchema = new SimpleSchema({
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
  nombre: {
    type: String,
    label: 'Nombre de la organización'
  },
  seps: {
    type: String,
    label: 'Fecha de registro en la SEPS'
  },
  acreditacionMagap: {
    type: String,
    label: 'Fecha de acreditación en el MAGAP'
  },
  nombreRepresentante: {
    type: String,
    label: 'Nombre del representante'
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
  productoresOrganizacion: {
    type: Number,
    label: 'Número de productores de la organización'
  },
  productoresCialco: {
    type: Array,
    label: 'Productores del CIALCO',
    optional: true
  },
  'productoresCialco.$': {
    type: Object
  },
  'productoresCialco.$.cialcoID': {
    type: String,
    label: 'Nombre del CIALCO'
  },
  'productoresCialco.$.hombres': {
    type: Number,
    label: 'Número de hombres en el CIALCO'
  },
  'productoresCialco.$.mujeres': {
    type: Number,
    label: 'Número de mujeres en el CIALCO'
  },
  'productoresCialco.$.total': {
    type: Number,
    label: 'Total de productores en el CIALCO'
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

Organizaciones.attachSchema(OrganizacionesSchema);

TabularTables.Organizaciones = new Tabular.Table({
  name: "Lista de organizaciones",
  collection: Organizaciones,
  columns: [
    {data: "zona", title: "Zona"},
    {data: "provincia", title: "Provincia"},
    {data: "canton", title: "Cantón"},
    {data: "cuatrimestre", title: "Cuatrimestre"},
    {data: "nombre", title: "Organización"},
    {data: "nombreRepresentante", title: "Representante"}
  ]
});
