const fs = require('fs');
const { Readable } = require('stream');
const { format } = require('date-fns');

class TimeReadableStream extends Readable {
    constructor(options) {
        super(options);
        this.interval = null;
    }

    _read() {
      
        if (this.interval) return;

        this.interval = setInterval(() => {
            const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
            this.push(currentTime + '\n');
        
        }, 1000);
    }

   
}

 
const writableStream = fs.createWriteStream('output.txt', { flags: 'a' });
const timeStream = new TimeReadableStream();

 
timeStream.pipe(writableStream);
