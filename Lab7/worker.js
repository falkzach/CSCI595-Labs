self.addEventListener('message', function(e) {
    var data = e.data;
    var output = [];
    switch (data.cmd) {
        case 'read':
            var lines = data.csv.split(/\n/);
            for(var i =0; i < lines.length; i++)
            {
                var tokens;
                if (lines[i] !== '')
                {
                    tokens = lines[i].split(/<SEP>/);
                    output.push({track_id: tokens[2], artist: tokens[3]})
                }
            }
            this.postMessage({'result': output});
            break;
        default:
            self.postMessage('Unknown command: ' + data.cmd);
    }
}, false);
