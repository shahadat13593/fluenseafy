import Image from "next/image";
import { ChevronDownIcon, InfoIcon } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Cta() {
  return (
    <section id="assessment" className="pb-16 sm:pb-20 lg:pb-28">
      <Container>
        <div className="reveal grid items-center gap-8 overflow-hidden rounded-3xl border bg-gradient-to-br from-accent to-surface p-6 shadow-card sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:p-14">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
              Get your first Level assessment for free!
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
              Take the first step toward fluency with a free level assessment.
              No commitment — just sign up and get started!
            </p>

            {/* Registration is not implemented yet: the submit button stays disabled. */}
            <form className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="full-name" className="text-sm font-semibold">
                  Full Name:
                </Label>
                <Input
                  type="text"
                  id="full-name"
                  name="full-name"
                  placeholder="Shahadat Hossain"
                  autoComplete="name"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email:
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="where" className="text-sm font-semibold">
                  Where did you know about us?
                </Label>
                <div className="relative">
                  <select
                    id="where"
                    name="where"
                    defaultValue=""
                    className="h-11 w-full appearance-none rounded-lg border border-input bg-background px-3.5 pr-10 text-base text-foreground transition-[border-color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <option value="">Please choose one option:</option>
                    <option value="friends">Friends and family</option>
                    <option value="youtube">Youtube</option>
                    <option value="facebook">Facebook</option>
                    <option value="podcast">Podcast</option>
                    <option value="other">Other</option>
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-48"
                  disabled
                >
                  Register now
                </Button>
                <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
                  <InfoIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  Registration is not open yet. This form will be enabled when
                  the platform launches.
                </p>
              </div>
            </form>
          </div>

          <Image
            src="/img/form.png"
            alt="A woman studying English at her desk"
            width={4000}
            height={4000}
            sizes="(min-width: 1024px) 400px, 70vw"
            className="mx-auto h-auto w-full max-w-xs lg:max-w-none"
          />
        </div>
      </Container>
    </section>
  );
}
