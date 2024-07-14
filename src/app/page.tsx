Check;
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Check } from "lucide-react";
import { Icons } from "@/components/Icons";

export default function Home() {
  return (
    <div className="bg-slate-50 grainy-light">
      <section>
        <MaxWidthWrapper className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52">
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                {/* i forgot this div right here in the video, it's purely visual gradient and looks nice */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
              </div>
              <h1 className="relative w-fit tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                Tu{" "}
                <span className="relative px-1">
                  Mejor{" "}
                  <Icons.underline className="hidden sm:block pointer-events-none absolute inset-x-0 -bottom-6 text-blue-500" />
                </span>{" "}
                Pedido
              </h1>
              {/* FIXME: add real text here */}
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
                corrupti animi eius perferendis ratione veniam.
                <span className="font-semibold">one-of-one</span> phone case.
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              {/* FIXME: Check real data with users */}
              <ul className="mt-8 space-y-2 text-left font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Mejores precios
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Mayor variedad
                  </li>
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-blue-600" />
                    Mejor atencion
                  </li>
                </div>
              </ul>
            </div>
          </div>

          <div className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              {/* TODO: Image animation on load */}
              <img
                src="/logo.png"
                className="pointer-events-none z-50 select-none"
                alt="IBSA logo"
              />
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
