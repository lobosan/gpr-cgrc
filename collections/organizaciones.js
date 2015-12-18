Organizaciones = new Meteor.Collection('organizaciones');

Organizaciones.attachSchema(new SimpleSchema({
  anio: {
    type: String,
    label: 'Año',
    autoform: {
      type: 'select',
      defaultValue: 2015,
      firstOption: 'Seleccione un año',
      options: function () {
        return _.map(_.range(2011, new Date().getFullYear() + 1), function (value) {
          return {label: value, value: value};
        });
      }
    }
  },
  cuatrimestre: {
    type: String,
    label: 'Cuatrimestre',
    autoform: {
      type: 'select-radio-inline',
      defaultValue: '3',
      options: function () {
        return [
          {label: '1', value: '1'},
          {label: '2', value: '2'},
          {label: '3', value: '3'}
        ];
      }
    }
  },
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
          {label: 'Insular', value: 'Insular'}
        ];
      }
    }
  },
  provinciaID: {
    type: String,
    label: 'Provincia',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione una provincia',
      options: function () {
        return DPA.find({grupo: 'Provincia'}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  provinciaNombre: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoProvincia = this.field('provinciaID').value;
          if (codigoProvincia)
          return DPA.findOne({codigo: codigoProvincia}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoProvincia}).descripcion};
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
  cantonID: {
    type: String,
    label: 'Cantón',
    autoform: {
      type: 'select',
      firstOption: 'Seleccione un cantón',
      options: function () {
        var codigoProvincia = AutoForm.getFieldValue('provinciaID');
        var cantones = new RegExp('^' + codigoProvincia + '[\\d]{2}$');
        return DPA.find({codigo: {$regex: cantones}}).map(function (dpa) {
          return {label: dpa.descripcion, value: dpa.codigo};
        });
      }
    }
  },
  cantonNombre: {
    type: String,
    autoValue: function () {
      if (this.isInsert) {
        let codigoCanton = this.field('cantonID').value;
        if (codigoCanton)
          return DPA.findOne({codigo: codigoCanton}).descripcion;
      } else if (this.isUpsert) {
        return {$setOnInsert: DPA.findOne({codigo: codigoCanton}).descripcion};
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
  localidad: {
    type: String,
    label: 'Localidad',
    optional: true
  },
  nombreOrganizacion: {
    type: String,
    label: 'Nombre de la organización',
    index: true,
    unique: true
  },
  seps: {
    type: String,
    label: 'Fecha de registro en la SEPS',
    optional: true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },
  acreditacionMagap: {
    type: String,
    label: 'Fecha de acreditación en el MAGAP',
    optional: true,
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
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
    label: 'Número de productores de la organización',
    min: 1
  },
  productoresCialco: {
    type: Array,
    label: 'Productores de la organización vinculados a CIALCOs',
    optional: true
  },
  'productoresCialco.$': {
    type: Object
  },
  'productoresCialco.$.cialcoID': {
    type: String,
    label: 'Nombre del CIALCO',
    optional: true,
    autoform: {
      type: "select2",
      options: function () {
        return Cialcos.find().map(function (cialco) {
          return {label: cialco.nombreCialco, value: cialco._id};
        });
      }
    }
  },
  'productoresCialco.$.cialcoNombre': {
    type: String,
    optional: true,
    autoValue: function () {
      let cialcoID = this.siblingField("cialcoID").value;
      if (cialcoID)
        return Cialcos.findOne({_id: cialcoID}).nombreCialco;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  'productoresCialco.$.hombres': {
    type: Number,
    label: 'Número de hombres en el CIALCO',
    min: 0,
    optional: true
  },
  'productoresCialco.$.mujeres': {
    type: Number,
    label: 'Número de mujeres en el CIALCO',
    min: 0,
    optional: true
  },
  'productoresCialco.$.totalProductores': {
    type: Number,
    optional: true,
    autoValue: function () {
      let hombres = (this.siblingField("hombres").value) ? this.siblingField("hombres").value : 0;
      let mujeres = (this.siblingField("mujeres").value) ? this.siblingField("mujeres").value : 0;
      return hombres + mujeres;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  observaciones: {
    type: String,
    label: 'Observaciones',
    optional: true,
    autoform: {
      rows: 4
    }
  },
  createdAt: {
    type: String,
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
}));

TabularTables.Organizaciones = new Tabular.Table({
  name: "Lista de organizaciones",
  collection: Organizaciones,
  columns: [
    {data: "anio", title: "Año"},
    {data: "cuatrimestre", title: "Cuatrimestre"},
    {data: "zona", title: "Zona"},
    {data: "provinciaNombre", title: "Provincia"},
    {data: "cantonNombre", title: "Cantón"},
    {data: "nombreOrganizacion", title: "Organización"},
    {data: "nombreRepresentante", title: "Representante"}
  ],
  sub: new SubsManager()
});
