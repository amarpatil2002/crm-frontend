import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { organizationSchema } from "../schema/organization.schema";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import type {
  Organization,
  OrganizationFormValues,
} from "../types/organization.type";

import GeneralInformationSection from "./GeneralInformationSection";
import OrganizationOverviewCard from "./OrganizationOverviewCard";

import { updateOrganizationProfile } from "../redux/organizationSlice";

interface OrganizationProfileFormProps {
  organization: Organization;
}

const OrganizationProfileForm = ({
  organization,
}: OrganizationProfileFormProps) => {
  const dispatch = useAppDispatch();

  const { updating } = useAppSelector((state) => state.organization);

  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OrganizationFormValues>({
    resolver: yupResolver(organizationSchema),
    defaultValues: organization,
  });

  useEffect(() => {
    reset(organization);
  }, [organization, reset]);

  const onSubmit = async (data: OrganizationFormValues) => {
    try {
      await dispatch(updateOrganizationProfile(data)).unwrap();

      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelEdit = () => {
    reset(organization);

    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-6 xl:grid-cols-3"
    >
      {/* Left */}

      <div className="xl:col-span-2">
        <GeneralInformationSection
          register={register}
          errors={errors}
          isEditing={isEditing}
          saving={updating}
          onEdit={() => setIsEditing(true)}
          onCancel={cancelEdit}
        />
      </div>

      {/* Right */}

      <div>
        <OrganizationOverviewCard organization={organization} />
      </div>
    </form>
  );
};

export default OrganizationProfileForm;
