import { useState } from "react";

export default function BrandLogo({ themeAware = false }: { themeAware?: boolean }) {
  const [originalAvailable, setOriginalAvailable] = useState(false);

  // Add the user's original, unmodified logo at public/autosphere-logo.png.
  // Keep the existing branding visible until that file is available.
  if (!originalAvailable) {
    return (
      <span className="inline-flex items-center gap-2">
        {themeAware && (
          <img src="/logo.png" alt="" className="h-9 w-9 object-contain dark:hidden sm:h-12 sm:w-12" />
        )}
        <img src="/logo2.png" alt="" className={`h-9 w-9 object-contain sm:h-12 sm:w-12 ${themeAware ? "hidden dark:block" : ""}`} />
        <span className={`text-base font-semibold tracking-tight sm:text-xl ${themeAware ? "text-zinc-900 dark:text-white" : "text-white"}`}>
          Auto<span className="text-brand">Sphere</span>
        </span>
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-md bg-[#FAF9F6] px-2 py-1">
      <img
        src="/autosphere-logo.png"
        alt="AutoSphere — Car Accessories"
        width={436}
        height={160}
        className="h-11 w-[120px] object-contain sm:h-12 sm:w-[132px] lg:h-14 lg:w-[154px]"
        onError={() => setOriginalAvailable(false)}
      />
    </span>
  );
}
