const mongoose = require('mongoose');

const password = 'FJNdhMdwpDlfSi8t' // not the atlas password. db cluster password? seems if you lose it, create a new user
const url = `mongodb+srv://jayabose:${password}@cluster0.4k9meiq.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false);

mongoose.connect(url);
console.log('connect');

// https://mongoosejs.com/docs/index.html
// schema will be used to create a modle
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

// model is used to create documents
const Note = mongoose.model('Note', noteSchema);

// create a document
const note = new Note({
  content: 'HTML is Easy - foo',
  important: true,
})


const result = await Note.find({});
result.forEach(note => {
  console.log(note);
});

// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note);
//   });
//   mongoose.connection.close();
// })