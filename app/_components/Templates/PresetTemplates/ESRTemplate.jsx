import React from "react";

function ESRTemplate() {
  return (
    <div className="flex items-center gap-10 " dir="ltr">
      <span>ESR</span>
      <div className="flex items-center gap-2">
        <span>1hr.</span>
        <span className="px-12 py-1 bg-light_primary rounded">?</span>
      </div>
      <div className="flex items-center gap-2">
        <span>2hr.</span>
        <span className="px-12 py-1 bg-light_primary rounded">?</span>
      </div>
    </div>
  );
}

export default ESRTemplate;
