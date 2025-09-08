import { Cookie } from "lucide-react";

export default function HomeFooter() {
  return (
    <>
      <div id="" className="mt-20 fixed hidden">
        <div id="0WvyULig5S">
          <div className="opacity-50 p-3 border-t border-gray-100 dark:border-gray-800 text-left text-xs">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <a
                  href="https://web.fourvenues.com/legal/aviso-legal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hover:underline"
                >
                  Aviso legal
                </a>

                <span className="max-sm:hidden">·</span>

                <a
                  href="https://web.fourvenues.com/legal/politica-de-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hover:underline"
                >
                  Política de Cookies
                </a>

                <span className="max-sm:hidden">·</span>

                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hover:underline"
                >
                  Política de Privacidad
                </a>
              </div>

              <div className="flex-grow-0">
                <a
                  rel="noopener noreferrer"
                  className="sm:hover:underline flex gap-2 items-center"
                >
                  <Cookie className="size-4" />
                  Cookies
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
