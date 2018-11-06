module.exports = {
  environments: {
    dev: {
      coreOpts:{
        siteUrl: 'http://rdportal.cloudapp.net/sites/fechado/',
        checkin: true,
        checkinType: 1
      },
      fileOpts:{
        folder: "Paginas/Orientador",
        glob: ["dist/**/*.*"],
        base: "dist"
      }
    },
    hom: {
      coreOpts:{
        siteUrl: 'http://10.59.135.29',
        checkin: true,
        checkinType: 1
      },
      fileOpts:{
        folder: "Paginas/Orientador",
        glob: ["dist/**/*.*"],
        base: "dist"
      }
    },
    prd:{
      coreOpts:{
        siteUrl: 'http://10.234.154.18:8181/sites/fechado/',
        checkin: true,
        checkinType: 1
      },
      fileOpts:{
        folder: "Paginas/Orientador",
        glob: ["dist/**/*.*"],
        base: "dist"
      }
    }
  }
};