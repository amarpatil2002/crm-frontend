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
import AddressCard from "./AddressCard";
import WorkspaceSettingsSection from "./WorkspaceSettingsSection";
import OrganizationOverviewCard from "./OrganizationOverviewCard";
import SubscriptionCard from "./SubscriptionCard";
import LogoUploader from "./LogoUploader";
import { updateOrganizationProfile } from "../redux/organizationSlice";

interface OrganizationProfileFormProps {
  organization: Organization;
}

const OrganizationProfileForm = ({
  organization,
}: OrganizationProfileFormProps) => {
  const dispatch = useAppDispatch();

  const { updating } = useAppSelector((state) => state.organization);

  const [generalEditing, setGeneralEditing] = useState(false);

  const [addressEditing, setAddressEditing] = useState(false);

  const [workspaceEditing, setWorkspaceEditing] = useState(false);

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

      setGeneralEditing(false);
      setAddressEditing(false);
      setWorkspaceEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cancelGeneralEdit = () => {
    reset(organization);

    setGeneralEditing(false);
  };

  const cancelAddressEdit = () => {
    reset(organization);

    setAddressEditing(false);
  };

  const cancelWorkspaceEdit = () => {
    reset(organization);

    setWorkspaceEditing(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {" "}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Left Side */}

        <div className="space-y-6 xl:col-span-2">
          <GeneralInformationSection
            register={register}
            errors={errors}
            isEditing={generalEditing}
            saving={updating}
            onEdit={() => setGeneralEditing(true)}
            onCancel={cancelGeneralEdit}
          />

          <AddressCard
            register={register}
            errors={errors}
            isEditing={addressEditing}
            saving={updating}
            onEdit={() => setAddressEditing(true)}
            onCancel={cancelAddressEdit}
          />

          <WorkspaceSettingsSection
            register={register}
            errors={errors}
            isEditing={workspaceEditing}
            saving={updating}
            onEdit={() => setWorkspaceEditing(true)}
            onCancel={cancelWorkspaceEdit}
          />
        </div>

        {/* Right Side */}

        <div className="space-y-6">
          <OrganizationOverviewCard organization={organization} />
          <SubscriptionCard subscription={organization.subscription} />{" "}
          <LogoUploader
            logo={organization.logo}
            disabled={
              generalEditing || addressEditing || workspaceEditing || updating
            }
          />
        </div>
      </div>
    </form>
  );
};

export default OrganizationProfileForm;
