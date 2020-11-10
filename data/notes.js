const faker = require("faker");

const NUM_SAMPLE = 4;

async function addSampleNotes(notes) {
  const samples = await notes.readAll();

  if (samples.length !== 0) return;

  for(let i = 0; i < NUM_SAMPLE; i++) {
    await notes.create(faker.lorem.paragraphs(), faker.name.findName());
  }
}

module.exports = { addSampleNotes };
