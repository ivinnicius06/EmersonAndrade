import { test } from "node:test";
import assert from "node:assert/strict";
import {
  initialMeasurements,
  profileMessage,
  measureFields,
} from "../src/lib/fit.ts";
import { whatsapp } from "../src/lib/site.ts";
test("Perfil preserva acentos, unidades e os seis valores ao abrir o WhatsApp", () => {
  const values = {
    height: 191,
    weight: 85,
    shoulders: 51,
    chest: 112,
    waist: 96,
    hips: 108,
  };
  const message = profileMessage(" João & André ", "(77) 99999-9999", values);
  const url = new URL(whatsapp(message));
  assert.equal(url.hostname, "wa.me");
  assert.equal(url.pathname, "/5577998229945");
  assert.equal(url.searchParams.get("text"), message);
  assert.match(message, /Nome: João & André\n/);
  for (const f of measureFields)
    assert.ok(message.includes(`${f.label}: ${values[f.key]} ${f.unit}`));
  assert.match(message, /Origem: EA Fit — Landing Page\./);
});
test("Todos os valores iniciais podem ser usados nos controles de medidas", () => {
  for (const field of measureFields) {
    assert.ok(initialMeasurements[field.key] >= field.min);
    assert.ok(initialMeasurements[field.key] <= field.max);
  }
});
