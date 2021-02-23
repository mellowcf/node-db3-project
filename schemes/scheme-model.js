const db = require("../data/config");

function find() {
  return db("schemes").select("*");
}

function findById(id) {
  return db("schemes").select("*").where({ id });
}

function findSteps(schemeId) {
  return db("schemes")
    .select("schemes.scheme_name", "steps.step_number", "steps.instructions")
    .join("steps")
    .where("schemes.id", schemeId);
}

async function add(scheme) {
  const [id] = await db("schemes").insert(scheme);
  return findById(id);
}

async function update(changes, id) {
  await db("schemes").where({ id }).update(changes);
  return findById(id);
}

function remove(id) {
  if (!id) {
    return null;
  }
  return db("schemes").where({ id }).del();
}

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove,
};
