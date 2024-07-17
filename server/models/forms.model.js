const forms = require("./forms.mongo");

async function addForm(userForm) {
  try {
    const newFormNumber = (await getLatestFormNumber()) + 1;
    Object.assign(userForm, (userForm.formNumber = newFormNumber));
    await forms.findOneAndUpdate({ formNumber: newFormNumber }, userForm, {
      upsert: true,
    });
    console.log("New Form Added Successfully");
  } catch (err) {
    console.err("Form cannot be added");
  }
}

async function getAllForms() {
  return await forms.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function getLatestFormNumber() {
  const latestForm = await forms.findOne().sort("-formNumber");
  if (!latestForm) {
    return 0;
  }
  return latestForm.formNumber;
}

module.exports = {
  addForm,
  getAllForms,
};
