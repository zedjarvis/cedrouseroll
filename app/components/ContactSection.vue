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

/* ---------------- state ---------------- */
const name = ref("");
const email = ref("");
const message = ref("");

const isSubmitting = ref(false);
const hasSubmitted = ref(false);

/* ---------------- validation ---------------- */
const errors = computed(() => ({
  name: !name.value.trim(),
  email: !email.value.trim(),
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

  const { error } = await supabase.from("Contacts").insert({
    name: name.value.trim(),
    email: email.value.trim(),
    message: message.value.trim(),
  });

  isSubmitting.value = false;

  if (error) {
    toast.error("Failed to send message. Please try again.");
    return;
  }

  toast.success("Message sent successfully", {
    position: "top-center",
  });

  // reset
  name.value = "";
  email.value = "";
  message.value = "";
  hasSubmitted.value = false;
};

/* ---------------- keyboard submit ---------------- */
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
</script>

<template>
  <section
    id="contact"
    class="flex flex-col gap-8 justify-center items-center w-full"
  >
    <div class="w-full max-w-2xl h-min px-4 scroll-mt-6">
      <div
        class="flex flex-col content-start items-start gap-4 w-full h-min relative"
      >
        <div class="flex-none whitespace-pre">
          <SectionTitle text="Contact" />
        </div>

        <div class="contents">
          <SectionDescription
            text="You can contact me using the form or via the links below."
          />
        </div>
      </div>

      <div id="contact-form" class="w-full mt-5">
        <form class="flex flex-col w-full" @submit.prevent="sendMessage">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
            <!-- Name -->
            <Field class="col-span-1 w-full">
              <Input
                id="name"
                v-model="name"
                placeholder="Name"
                class="h-10.5 w-full rounded-lg"
                :aria-invalid="hasSubmitted && errors.name"
              />
              <FieldError v-if="hasSubmitted && errors.name">
                Name is required
              </FieldError>
            </Field>

            <!-- Email -->
            <Field class="col-span-1 w-full">
              <Input
                id="email"
                v-model="email"
                placeholder="Email"
                class="h-10.5 w-full rounded-lg"
                :aria-invalid="hasSubmitted && errors.email"
              />
              <FieldError v-if="hasSubmitted && errors.email">
                Email is required
              </FieldError>
            </Field>

            <!-- Message -->
            <Field class="col-span-1 md:col-span-2 w-full">
              <Textarea
                v-model="message"
                placeholder="Message"
                class="w-full min-h-50 rounded-lg resize-none"
                :aria-invalid="hasSubmitted && errors.message"
                @keydown="onKeydown"
              />
              <FieldError v-if="hasSubmitted && errors.message">
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
            >
              {{ isSubmitting ? "Sending…" : "Send message" }}
            </Button>

            <p class="text-sm flex gap-1 items-center text-muted-foreground">
              or <CornerDownLeft :size="17" /> Enter to send
            </p>
          </div>
        </form>
      </div>
    </div>

    <div class="flex flex-col w-full">
      <div
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Mail />
              <p class="">Email</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>omondicedo@gmail.com</p>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </div>

      <NuxtLink
        external
        target="_black"
        to="https://www.linkedin.com/in/cedrouseroll-omondi-44b119252"
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Linkedin />
              <p class="">Linkedin</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>/in/cedrouseroll-omondi-44b119252</p>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </NuxtLink>

      <NuxtLink
        external
        to="https://github.com/zedjarvis"
        target="_blank"
        class="hover:bg-[#141414] transition-all ease-out duration-200 flex justify-center py-2"
      >
        <div
          class="w-full mx-auto max-w-2xl px-4 flex items-center justify-between"
        >
          <div class="flex justify-between items-center w-full">
            <div class="flex gap-3 items-center text-muted-foreground">
              <Github />
              <p class="">GitHub</p>
            </div>
            <div class="flex gap-2 items-center text-muted-foreground">
              <p>@zedjarvis</p>
              <ArrowUpRight />
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="flex justify-center items-center w-full mt-6">
      <img src="/images/sig.svg" class="w-60" alt="Ced's sig" />
    </div>
  </section>
</template>
