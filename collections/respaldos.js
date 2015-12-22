Respaldos = new Meteor.Collection('respaldos');

Respaldos.attachSchema(new SimpleSchema({
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
  periodo: {
    type: String,
    label: 'Período',
    autoform: {
      type: 'select-radio-inline',
      defaultValue: 'Tercer cuatrimestre',
      options: function () {
        return [
          {label: 'Primer cuatrimestre', value: 'Primer cuatrimestre'},
          {label: 'Segundo cuatrimestre', value: 'Segundo cuatrimestre'},
          {label: 'Tercer cuatrimestre', value: 'Tercer cuatrimestre'},
          {label: 'Primer semestre', value: 'Primer semestre'},
          {label: 'Segundo semestre', value: 'Segundo semestre'}
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
  respaldo: {
    type: String,
    label: 'Respaldo',
    autoform: {
      afFieldInput: {
        type: "cfs-file",
        collection: "uploads"
      }
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

TabularTables.Respaldos = new Tabular.Table({
  name: "Lista de respaldos",
  collection: Respaldos,
  columns: [
    {data: "zona", title: "Zona"},
    {data: "provinciaNombre", title: "Provincia"},
    {data: "anio", title: "Año"},
    {data: "periodo", title: "Período"},
    {data: "respaldo", title: "Respaldo", render: function (val, type, doc) {
      if (val) {
        let upload  = Uploads.findOne({_id: val}).copies.uploads;
        return `<a target="_blank" href="/cfs/files/uploads/${val}/${upload.name}">${upload.name}</a>`;
      }
    }},
    {data: "observaciones", title: "Observaciones"}
  ],
  sub: new SubsManager()
});
