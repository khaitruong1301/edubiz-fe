import React from "react";
import "./CardLoTrinh_design_code.css";
const CardLoTrinh_design_code = ({ title }) => {
  return (
    <div className="HandbookSection__Wrapper-sc-1mdf3fj-0 cYiLf card_design_code">
      <div className="HandbookCard__Wrapper-sc-7b5434-1 hoyCxl  cursor-pointer">
        <div className="HandbookCard__FirstBackground-sc-7b5434-2 iusqHF">
          <div className="lazyload-wrapper">
            <img
              src="//images.ctfassets.net/ooa29xqb8tix/6YcYeXOUXJR311G9VyFniz/8bd9148821a2fba3e783b68a0ba9c509/swift-logo.png?w=400&q=50"
              alt="handbook logo"
              className="HandbookCard__Logo-sc-7b5434-4 bQgFqA"
            />
          </div>
          <div className="HandbookCard__TextWrapper-sc-7b5434-5 kqcNFY">
            <p className="TextStyles__SmallText2-h7d1e3-13 HandbookCard__Caption-sc-7b5434-6 cLLBBH" />
            <h3 className="TextStyles__H3H5-h7d1e3-6 HandbookCard__Title-sc-7b5434-7 hpcBLU">
              {title}
            </h3>
            <p className="TextStyles__SmallText-h7d1e3-12 HandbookCard__Description-sc-7b5434-8 jslvrh">
              A comprehensive series of tutorials covering Xcode, SwiftUI and
              all the layout and development techniques
            </p>
            <div className="HandbookCard__Info-sc-7b5434-9 jyUuiI">
              <div className="HandbookCard__IconWrapper-sc-7b5434-10 dOlCTi">
                <img
                  src="/images/icons/file.svg"
                  alt="file icon"
                  className="HandbookCard__Icon-sc-7b5434-11 iVMFhc"
                />
              </div>
              <p className="TextStyles__SmallText-h7d1e3-12 HandbookCard__Text-sc-7b5434-12 hxPJcZ">
                72 free tutorials
              </p>
            </div>
            <div className="HandbookCard__Info-sc-7b5434-9 jyUuiI">
              <div className="HandbookCard__IconWrapper-sc-7b5434-10 dOlCTi">
                <img
                  src="/images/icons/code.svg"
                  alt="code icon"
                  className="HandbookCard__Icon-sc-7b5434-11 iVMFhc"
                />
              </div>
              <p className="TextStyles__SmallText-h7d1e3-12 HandbookCard__Text-sc-7b5434-12 hxPJcZ">
                Videos, PDF, files
              </p>
              <div className="HandbookCard__Pro-sc-7b5434-13 odTMY">
                <p className="TextStyles__SmallText-h7d1e3-12 HandbookCard__ProText-sc-7b5434-14 hcyWlK">
                  PRO
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          color="linear-gradient(180deg, #408DD5 0%, #630B8C 100%)"
          className="HandbookCard__SecondBackground-sc-7b5434-3 lcvTnr  cursor-pointer card_design_code_bg"
        />
      </div>
      <div className="gLpcBy">a</div>
    </div>
  );
};

export default CardLoTrinh_design_code;
