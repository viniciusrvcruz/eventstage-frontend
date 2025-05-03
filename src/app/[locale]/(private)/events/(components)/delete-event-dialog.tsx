'use client'

import { Button } from '@/components/button'
import { deleteEvent } from '@/services/event-service'
import type { EventSchema } from '@/types/event'
import { alertToast } from '@/utils/helper'
import { TriangleAlert } from 'lucide-react'
import { useTranslations } from 'next-intl'
import type { Dispatch, SetStateAction } from 'react'

interface DeleteEventDialogProps {
  event: EventSchema
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  handleDeleted: (eventId: string) => void
}

export function DeleteEventDialog({
  event,
  open,
  setOpen,
  handleDeleted,
}: DeleteEventDialogProps) {
  const t = useTranslations('private.events')

  function handleDelete() {
    deleteEvent(event.id)
      .then(() => {
        alertToast(t('deleted_success'), 'success')
        handleDeleted(event.id)
        closeModal()
      })
      .catch(() => alertToast(t('deleted_fail'), 'error'))
  }

  function closeModal() {
    setOpen(false)
  }

  return (
    <div>
      {open && (
        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-gray-500/90 transition-opacity"
            aria-hidden="true"
          />
          <div className="fixed inset-0 z-10 w-screen  overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative bg-gray-700 border border-gray-600 transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <TriangleAlert />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-base font-semibold text-gray-100"
                        id="modal-title"
                      >
                        {t('delete_question', {
                          event_title: event.title,
                        })}
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-200">
                          {t('delete_description')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 flex flex-col gap-2 sm:flex-row sm:justify-end sm:px-6">
                  <Button
                    className="bg-transparent sm:w-auto"
                    onClick={closeModal}
                  >
                    {t('cancel')}
                  </Button>
                  <Button className="sm:w-auto" onClick={handleDelete}>
                    {t('delete')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
