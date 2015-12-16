Metas = new Meteor.Collection('metas');

let MetasSchema = new SimpleSchema({
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
      firstOption: '',
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
    }
  },
  anio: {
    type: String,
    label: 'Año',
    autoform: {
      type: 'select',
      firstOption: '',
      options: function () {
        return _.map(_.range(2010, new Date().getFullYear() + 1), function (value) {
          return {label: value, value: value};
        });
      }
    }
  },
  cialcoPrimerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  cialcoSegundoCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  cialcoTercerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  organizacionesPrimerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  organizacionesSegundoCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  organizacionesTercerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  redesPrimerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  redesSegundoCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  redesTercerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  productoresPrimerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Primer cuatrimestre'
  },
  productoresSegundoCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Segundo cuatrimestre'
  },
  productoresTercerCuatrimestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Tercer cuatrimestre'
  },
  montoVentasPrimerSemestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Primer semestre'
  },
  montoVentasSegundoSemestre: {
    type: Number,
    decimal: true,
    min: 1,
    label: 'Segundo semestre'
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
});

Metas.attachSchema(MetasSchema);
