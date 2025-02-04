import { readFileSync } from "fs";

import { list, parse } from "../dist/subsrt.js";

describe("Parse", () => {
    it("should parse a subtitle file", () => {
        const formats = list();
        for (let i = 0; i < formats.length; i++) {
            const ext = formats[i];
            console.log(`Parse .${ext}`);
            const content = readFileSync(`./test/fixtures/sample.${ext}`, "utf8");
            const captions = parse(content, { format: ext });
            expect(captions.length).toBeGreaterThan(1);
        }
    });
});
