import { readFileSync } from "fs";

import { convert, detect, list, parse } from "../dist/subsrt.js";

describe("Convert", () => {
    it("should convert a subtitle file", () => {
        const extensions = list();
        for (let i = 0; i < extensions.length; i++) {
            for (let j = 0; j < extensions.length; j++) {
                const ext1 = extensions[i];
                const ext2 = extensions[j];

                console.log(`Convert .${ext1} to .${ext2}`);

                const content1 = readFileSync(`./test/fixtures/sample.${ext1}`, "utf8");
                const content2 = convert(content1, { from: ext1, to: ext2 });

                expect(typeof content2).toBe("string");
                expect(content2.length).toBeGreaterThan(0);

                const format = detect(content2);
                expect(format).toBe(ext2);

                const captions = parse(content2, { format: ext2 });
                expect(typeof captions).not.toBe("undefined");
                expect(captions.length).toBeGreaterThan(0);
            }
        }
    });
});
