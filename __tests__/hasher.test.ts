import hashSHA512 from "../helpers/hasher";

describe("hashSHA512", () => {
  it("deve retornar o hash correto para uma string dada", () => {
    const inputString = "Jon Doe";
    const expectedHash =
      "dfe058c3c1a721dd7d4fa041d911ba00ed40663f32cd15d73d735dd11408b09d0674cad05d8b0d8799fb538061f3cdb0bd894d1f248d7c7c64047d236a0c7346";

    const hashedString = hashSHA512(inputString);

    expect(hashedString).toBe(expectedHash);
  });

  it("deve retornar um hash diferente para strings diferentes", () => {
    const inputString1 = "String1";
    const inputString2 = "String2";

    const hashedString1 = hashSHA512(inputString1);
    const hashedString2 = hashSHA512(inputString2);

    expect(hashedString1).not.toBe(hashedString2);
  });

  it("Deve retornar o hash correto para um string de números", () => {
    const inputString = "1467635865287927";
    const expectedHash =
      "055790148f462ad8639aab36a76d31223ad338b0313b711b26fd6227c09ea70abfd0f5d472d5f8667b41566502a4530c340308f92497ce37ddbc98c9e2ad540e";

    const hashedString = hashSHA512(inputString);
    expect(hashedString).toBe(expectedHash);
  });
});
