<script setup lang="ts">
import { buttonStyles } from "~/components/component-styles/button-styles";
import { buttonTransparentStyles } from "~/components/component-styles/button-styles";
import HiddenInputField from "./HiddenInputField.vue";

const { title, value } = defineProps<{ title: string; value?: string }>();

const file = ref<File | string>("");
const newlyUploadedFile = ref<string>("");
const fileName = ref<string>("");

const handleFileChange = async (fileData: Event) => {
  const fileInputData = fileData.target as HTMLInputElement;
  if (fileInputData.files && fileInputData.files?.length > 0) {
    file.value = fileInputData.files[0];
  }
  await handleFileUpload();
};

const handleFileUpload = async () => {
  const body = new FormData();
  body.append("file", file.value);
  await useFetch("/api/upload-image", {
    method: "POST",
    body,
    onResponse(context) {
      newlyUploadedFile.value = context.response._data.path;
      fileName.value = context.response._data.fileName;
    },
  });
};

if (value) {
  newlyUploadedFile.value = value;
}
</script>

<template>
  <div class="my-2 flex flex-row w-full gap-4 justify-start items-center">
    <div
      :class="`w-32 h-32 border border-solid rounded-full overflow-clip ${
        newlyUploadedFile || value ? 'border-hibiscus-700' : 'border-slate-400'
      }`"
    >
      <img
        class="w-full h-full object-cover"
        :src="newlyUploadedFile"
        alt=""
        v-if="newlyUploadedFile"
      />
    </div>
    <label
      :class="`${buttonStyles} ${buttonTransparentStyles} text-hibiscus-700 border-hibiscus-700 hover:bg-hibiscus-700`"
      for="image"
    >
      {{ title }} <span>+</span>
    </label>

    <input
      @change="handleFileChange"
      type="file"
      name="image"
      id="image"
      placeholder="Wit"
      class="w-full hidden"
    />
  </div>
</template>
