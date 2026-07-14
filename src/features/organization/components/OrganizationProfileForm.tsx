import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { organizationSchema } from "../schema/organization.schema";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import type { Organization } from "../types/organization.type";

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
  } = useForm<Organization>({
    resolver: yupResolver(organizationSchema),

    defaultValues: organization,
  });

  useEffect(() => {
    reset(organization);
  }, [organization, reset]);

  const onSubmit = async (data: Organization) => {
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
      {(generalEditing || addressEditing || workspaceEditing) && (
        <div className="sticky bottom-0 z-10 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-lg">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Unsaved Changes
            </h3>

            <p className="text-sm text-slate-500">
              Save your changes before leaving this page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                reset(organization);

                setGeneralEditing(false);
                setAddressEditing(false);
                setWorkspaceEditing(false);
              }}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}{" "}
    </form>
  );
};

export default OrganizationProfileForm;
