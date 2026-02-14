<script setup lang="ts">
import {
  ArrowUpRight,
  CornerDownLeft,
  Github,
  Linkedin,
  Mail,
} from "lucide-vue-next";
import { Input } from "./ui/input";
import { Field, FieldError } from "./ui/field";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { toast } from "vue-sonner";

const supabase = useSupabaseClient();

const CONTACT_EMAIL = "omondicedo@gmail.com";

/* ---------------- state ---------------- */
const name = ref("");
const email = ref("");
const message = ref("");

const isSubmitting = ref(false);
const hasSubmitted = ref(false);

/* ---------------- validation ---------------- */
const emailLooksValid = computed(() => {
  const value = email.value.trim();
  if (!value) return false;
  // lightweight email format check (good enough for UX, not RFC-purist)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
});

const errors = computed(() => ({
  name: !name.value.trim(),
  email: !email.value.trim() || !emailLooksValid.value,
  message: !message.value.trim(),
}));

const isValid = computed(
  () => !errors.value.name && !errors.value.email && !errors.value.message,
);

/* ---------------- submit ---------------- */
const sendMessage = async () => {
  hasSubmitted.value = true;
  if (!isValid.value || isSubmitting.value) return;

  isSubmitting.value = true;

  const payload = {
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
  };

  const { error } = await supabase.from("Contacts").insert(payload);

  isSubmitting.value = false;

  if (error) {
    toast.error("Failed to send message. Please try again.", {
      position: "top-center",
    });
    return;
  }

  toast.success("Message sent successfully", { position: "top-center" });

  // reset
  name.value = "";
  email.value = "";
  message.value = "";
  hasSubmitted.value = false;
};

/* ---------------- keyboard submit ---------------- */
const onMessageKeydown = (e: KeyboardEvent) => {
  // Standard pattern: Ctrl/Cmd + Enter sends, Enter alone makes a newline.
  if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
    e.preventDefault();
    sendMessage();
  }
};

function mailtoHref() {
  const subject = encodeURIComponent("Hello Ced — from your portfolio");
  const body = encodeURIComponent("Hi Ced,\n\n");
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
</script>

<template>
  <section
    id="contact"
    class="flex flex-col gap-8 justify-center items-center w-full"
    aria-labelledby="contact-title"
  >
    <div class="w-full max-w-2xl h-min px-4 scroll-mt-6">
      <header
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle id="contact-title" text="Contact" />
        </div>

        <div class="contents">
          <SectionDescription
            text="You can contact me using the form or via the links below."
          />
        </div>
      </header>

      <div id="contact-form" class="w-full mt-5">
        <form
          class="flex flex-col w-full"
          @submit.prevent="sendMessage"
          novalidate
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
            <!-- Name -->
            <Field class="col-span-1 w-full">
              <label for="name" class="sr-only">Name</label>
              <Input
                id="name"
                v-model="name"
                name="name"
                autocomplete="name"
                placeholder="Name"
                class="h-10.5 w-full rounded-lg"
                :aria-invalid="hasSubmitted && errors.name ? 'true' : 'false'"
                :aria-describedby="
                  hasSubmitted && errors.name ? 'name-error' : undefined
                "
              />
              <FieldError v-if="hasSubmitted && errors.name" id="name-error">
                Name is required
              </FieldError>
            </Field>

            <!-- Email -->
            <Field class="col-span-1 w-full">
              <label for="email" class="sr-only">Email</label>
              <Input
                id="email"
                v-model="email"
                name="email"
                type="email"
                inputmode="email"
                autocomplete="email"
                placeholder="Email"
                class="h-10.5 w-full rounded-lg"
                :aria-invalid="hasSubmitted && errors.email ? 'true' : 'false'"
                :aria-describedby="
                  hasSubmitted && errors.email ? 'email-error' : undefined
                "
              />
              <FieldError v-if="hasSubmitted && errors.email" id="email-error">
                Please enter a valid email
              </FieldError>
            </Field>

            <!-- Message -->
            <Field class="col-span-1 md:col-span-2 w-full">
              <label for="message" class="sr-only">Message</label>
              <Textarea
                id="message"
                v-model="message"
                name="message"
                placeholder="Message"
                class="w-full min-h-50 rounded-lg resize-none"
                :aria-invalid="
                  hasSubmitted && errors.message ? 'true' : 'false'
                "
                :aria-describedby="
                  hasSubmitted && errors.message
                    ? 'message-error'
                    : 'message-help'
                "
                @keydown="onMessageKeydown"
              />
              <p id="message-help" class="sr-only">
                Press Control or Command plus Enter to send.
              </p>
              <FieldError
                v-if="hasSubmitted && errors.message"
                id="message-error"
              >
                Message is required
              </FieldError>
            </Field>
          </div>

          <!-- Actions -->
          <div class="flex items-center justify-between">
            <Button
              variant="secondary"
              class="rounded-full cursor-pointer"
              type="submit"
              :disabled="isSubmitting"
              :aria-disabled="isSubmitting ? 'true' : 'false'"
            >
              {{ isSubmitting ? "Sending…" : "Send message" }}
            </Button>

            <p class="text-sm flex gap-1 items-center text-muted-foreground">
              or
              <CornerDownLeft :size="17" aria-hidden="true" />
              <span class="tabular-nums">Ctrl/⌘</span> + Enter to send
            </p>
          </div>
        </form>
      </div>
    </div>

    <!-- Links -->
    <div class="flex flex-col w-full" aria-label="Contact links">
      <!-- Email (now a real link) -->
      <a
        :href="mailtoHref()"
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        :aria-label="`Email ${CONTACT_EMAIL}`"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Mail aria-hidden="true" />
              <p>Email</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p class="tabular-nums">{{ CONTACT_EMAIL }}</p>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </div>
        </div>
      </a>

      <NuxtLink
        external
        target="_blank"
        rel="noopener noreferrer"
        to="https://www.linkedin.com/in/cedrouseroll-omondi-44b119252"
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="LinkedIn profile (opens in a new tab)"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Linkedin aria-hidden="true" />
              <p>LinkedIn</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>/in/cedrouseroll-omondi-44b119252</p>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink
        external
        to="https://github.com/zedjarvis"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label="GitHub profile (opens in a new tab)"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Github aria-hidden="true" />
              <p>GitHub</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>@zedjarvis</p>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="flex justify-center items-center w-full mt-6">
      <img
        src="/images/sig.svg"
        class="w-60"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  </section>
</template>
