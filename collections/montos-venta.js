MontosVenta = new Meteor.Collection('montos-venta');

MontosVenta.attachSchema(new SimpleSchema({
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
  semestre: {
    type: String,
    label: 'Semestre',
    autoform: {
      type: 'select-radio-inline',
      defaultValue: '2',
      options: function () {
        return [
          {label: '1', value: '1'},
          {label: '2', value: '2'}
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
  cialcoID: {
    type: String,
    label: 'CIALCO',
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
  cialcoNombre: {
    type: String,
    optional: true,
    autoValue: function () {
      let cialcoID = this.field("cialcoID").value;
      if (cialcoID)
        return Cialcos.findOne({_id: cialcoID}).nombreCialco;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  cialcoModalidad: {
    type: String,
    optional: true,
    autoValue: function () {
      let cialcoID = this.field("cialcoID").value;
      if (cialcoID)
        return Cialcos.findOne({_id: cialcoID}).modalidad;
    },
    autoform: {
      type: 'hidden',
      label: false
    }
  },
  ventasSemestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Total de ventas por semestre ($)'
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

TabularTables.MontosVenta = new Tabular.Table({
  name: "Lista de montos de venta",
  collection: MontosVenta,
  columns: [
    {data: "anio", title: "Año"},
    {data: "semestre", title: "Semestre"},
    {data: "zona", title: "Zona"},
    {data: "provinciaNombre", title: "Provincia"},
    {data: "cialcoNombre", title: "CIALCO"},
    {data: "cialcoModalidad", title: "Modalidad"},
    {data: "ventasSemestre", title: "Venta semestral ($)"}
  ],
  sub: new SubsManager()
});
