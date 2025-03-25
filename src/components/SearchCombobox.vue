<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox'
import { Check, ChevronsUpDown, Search } from 'lucide-vue-next'
import { ref } from 'vue'
import { UfMapProps } from '@/types/components.types'

const props = defineProps<{
  data: any[]
  map?: Record<string, string>
  className?: string
}>()

const mappedData = ref<typeof props.data>([...props.data])

if (props.map) {
  mappedData.value = UfMapProps(props.data, props.map)
} else {
  mappedData.value = props.data
}

const value = ref<(typeof mappedData.value)[0]>()
</script>

<template>
  <Combobox v-model="value" by="label" :class="className">
    <ComboboxAnchor as-child>
      <ComboboxTrigger as-child>
        <Button variant="outline" class="justify-between w-full">
          {{ value?.label ?? 'Select symbol' }}

          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxList>
      <div class="relative w-full max-w-sm items-center">
        <ComboboxInput
          class="pl-9 focus-visible:ring-0 border-0 border-b rounded-none h-10"
          placeholder="Select symbol..."
        />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
          <Search class="size-4 text-muted-foreground" />
        </span>
      </div>

      <ComboboxEmpty> No data found. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="d in mappedData" :key="d.value" :value="d">
          {{ d.label }}
          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
