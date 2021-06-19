const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer.js');

//tell the workers whenever a new task is added run the code inside the function
queue.process('emails', function (job, done) {
    console.log('emails worker is processing a job', job.data);

    commentsMailer.newComment(job.data);
    done();
});
