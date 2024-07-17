const { addForm, getAllForms } = require("../models/forms.model");

async function httpAddForm(req, res) {
  const form = req.body;
  if (
    !form.fullName ||
    !form.email ||
    !form.phoneNumber ||
    !form.emailSubject
  ) {
    return res.status(400).json({
      error: "Sorry, some properties are missing",
    });
  }
  await addForm(form);
  return res.status(201).json(form);
}

async function httpGetAllForms(req, res) {
  const allForms = await getAllForms();
  return res.status(200).json(allForms);
}

module.exports = {
  httpAddForm,
  httpGetAllForms,
};
