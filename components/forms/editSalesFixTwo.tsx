import React from 'react'
import { Switch, CheckboxGroup, Tabs, Chip, User, Tab, cn, Input, Avatar, Card, CardHeader, CardBody, Divider, ScrollShadow, Button, Select, SelectItem, CardFooter, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Textarea, RadioGroup, Radio, Breadcrumbs, BreadcrumbItem, Image } from "@nextui-org/react";

interface editSellProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  typesellmenufix: any;
  typesellmenumix: any;
  idFix: any;
}

export default function EditSalesFixTwo({
  isOpen,
  onOpenChange,
  onClose,
  typesellmenufix,
  typesellmenumix,
  idFix
}: editSellProps) {



  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      size='xl'
      isDismissable={false} isKeyboardDismissDisabled={true}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Modal Title {idFix}</ModalHeader>
          </>
        )}
      </ModalContent>
    </Modal>

  )
}
