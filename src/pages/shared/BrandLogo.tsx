export default function BrandLogo({ themeAware = false }: { themeAware?: boolean }) {
  const imageClassName = `h-auto object-contain ${themeAware ? "w-[112px] sm:w-[148px] lg:w-[168px]" : "w-[192px]"}`;

  return (
    <span className={`inline-flex items-center rounded-md ${themeAware ? "p-1 sm:px-2 sm:py-1.5" : "px-3 py-2"}`}>
      {themeAware && (
        <img
          src="/AutoSphereCarLogo.png"
          alt="AutoSphere — Drive Better, Live Safer"
          width={2124}
          height={740}
          className={`${imageClassName} dark:hidden`}
        />
      )}
      <img
        src="/AutoSphereCarLogo-white.png"
        alt="AutoSphere — Drive Better, Live Safer"
        width={2124}
        height={740}
        className={`${imageClassName} ${themeAware ? "hidden dark:block" : ""}`}
        // Keep the original transparent silhouette while excluding generation spill around the lettering.
        style={{ maskImage: 'url("/AutoSphereCarLogo.png")', maskSize: "100% 100%", maskRepeat: "no-repeat" }}
      />
    </span>
  );
}
