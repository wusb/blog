var os=require('os'),ip='',ifaces=os.networkInterfaces();
for (var dev in ifaces) {
  ifaces[dev].forEach(function(details,alias){
    if (details.family=='IPv4') {
      ip = details.address;
    }
  });
}

module.exports = ip;