import React from "react";
import { ListRows } from "@/components/ListRows";
import { User } from "@/types/auth";
import "./style.css";

interface ContainerProps {
  activeTab: string;
  user: User | null;
}

export const Container = ({ activeTab, user }: ContainerProps): JSX.Element => {
  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case "basic-info":
  return (
    <div className="container">
      <div className="div">
        <div className="frame-wrapper">
          <div className="frame">
            <div className="body">Basic Info</div>
          </div>
        </div>

        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.fullName || `${user?.fname || ''} ${user?.lname || ''}`.trim() || 'Not provided'}
          text1="Name"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.basic_info?.gender ? user.basic_info.gender.charAt(0).toUpperCase() + user.basic_info.gender.slice(1) : 'Not provided'}
          text1="Gender"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.basic_info?.marital_status || 'Not provided'}
          text1="Marital Status"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.basic_info?.mother_tongue || 'Not provided'}
          text1="Mother Tongue"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="list-rows-3"
          divClassNameOverride="list-rows-2"
                divClassName1="list-rows-3"
          property1="label-free-text"
          text={user?.basic_info?.health_disease_disability || 'Not provided'}
          text1="Disease or Disability"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
                text={user?.basic_info?.languages_known?.join(' • ') || 'Not provided'}
          text1="Language Known"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.location ? `${user.location.city}, ${user.location.state}` : 'Not provided'}
          text1="Location"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="ethnicity"
          divClassNameOverride="list-rows-2"
                divClassName1="ethnicity"
          property1="label-free-text"
          text={user?.basic_info?.ethnicity || 'Not provided'}
          text1="Ethicity"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.basic_info?.height || 'Not provided'}
          text1="Height"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.basic_info?.weight?.toString() || 'Not provided'}
          text1="Weight"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.basic_info?.religion || 'Not provided'}
          text1="Religion"
        />
      </div>
          </div>
        );

      case "astro":
        return (
          <div className="container">
      <div className="astro">
        <div className="frame-wrapper">
          <div className="frame">
            <div className="body">Astro</div>
          </div>
        </div>

        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.astro?.date_of_birth ? new Date(user.astro.date_of_birth).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Not provided'}
          text1="Date of Birth"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.astro?.time_of_birth || 'Not provided'}
          text1="Time of Birth"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.astro?.birth_place || 'Not provided'}
          text1="Place of Birth"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="list-rows-3"
          divClassNameOverride="list-rows-2"
                divClassName1="list-rows-3"
          property1="label-free-text"
          text={user?.astro?.rashi || 'Not provided'}
          text1="Rashi"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-4"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.astro?.nakshatra || 'Not provided'}
          text1="Nakashtra"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-4"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.astro?.gotra || 'Not provided'}
          text1="Gotra"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.astro?.caste || 'Not provided'}
          text1="Caste"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.astro?.community || 'Not provided'}
          text1="Community"
        />
      </div>
          </div>
        );

      case "family":
        return (
          <div className="container">
      <div className="family-details">
        <ListRows
          className="list-rows-6"
          divClassName1="list-rows-5"
          property1="free-text"
          text="Family"
                text1=""
        />
        <ListRows
          className="father-name"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-8"
                divClassName1="father-name"
          property1="label-free-text"
          text={user?.family?.father_name || 'Not provided'}
                text1="Father's Name"
        />
        <ListRows
          className="mother-name"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-8"
                divClassName1="mother-name"
          property1="label-free-text"
          text={user?.family?.mother_name || 'Not provided'}
                text1="Mother's Name"
        />
        <ListRows
          className="father-employment"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-8"
                divClassName1="father-employment"
          property1="label-free-text"
          text={user?.family?.father_occupation || 'Not provided'}
                text1="Father's Employment"
        />
        <ListRows
          className="mother-employment"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-4"
                divClassName1="mother-employment"
          property1="label-free-text"
          text={user?.family?.mother_occupation || 'Not provided'}
                text1="Mother's Employment"
        />
        <ListRows
          className="family-location"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-8"
                divClassName1="family-location"
          property1="label-free-text"
          text={user?.family?.family_location || 'Not provided'}
          text1="Family Location"
        />
        <ListRows
          className="family-value"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-8"
                divClassName1="family-value"
          property1="label-free-text"
          text={user?.family?.family_culture || 'Not provided'}
          text1="Family Values"
        />
        <ListRows
          className="family-affluence"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-4"
                divClassName1="family-affluence"
          property1="label-free-text"
          text={user?.family?.family_status || 'Not provided'}
          text1="Family Affluence"
        />
        <ListRows
          className="sibling-details"
          divClassName1="list-rows-9"
          property1="free-text"
          text="Sibling Details"
                text1=""
        />
        <ListRows
          className="brother-number"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-4"
                divClassName1="brother-number"
          property1="label-free-text"
          text={user?.family?.brother_count?.toString() || 'Not provided'}
          text1="No. Of Brothers"
        />
        <ListRows
          className="sister-number"
          divClassName="list-rows-7"
          divClassNameOverride="list-rows-4"
                divClassName1="sister-number"
          property1="label-free-text"
          text={user?.family?.sister_count?.toString() || 'Not provided'}
          text1="No. of Sisters"
        />
      </div>
          </div>
        );

      case "career-details":
        return (
          <div className="container">
      <div className="div">
        <ListRows
          className="list-rows-10"
          divClassName1="list-rows-5"
          property1="free-text"
          text="Career Details"
                text1=""
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-4"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.career_education?.employed ? 'Employed' : 'Not employed'}
          text1="Employment Status"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-4"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.career_education?.company_name || 'Not provided'}
          text1="Company Name"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.career_education?.occupation || 'Not provided'}
          text1="Profession"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.career_education?.income || 'Not provided'}
          text1="Annual Income (LPA)"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.career_education?.job_location || 'Not provided'}
          text1="Job Location"
        />
        <ListRows
          className="list-rows-instance"
          divClassName="design-component-instance-node"
          divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
          property1="label-free-text"
          text={user?.career_education?.total_working_period?.toString() || 'Not provided'}
          text1="Total Work Ex (yrs.)"
        />
      </div>

      <ListRows
        className="list-rows-10"
        divClassName1="list-rows-9"
        property1="free-text"
        text="Education Details"
              text1=""
      />
      <ListRows
        className="list-rows-11"
        divClassName="list-rows-7"
        divClassNameOverride="list-rows-8"
              divClassName1="list-rows-11"
        property1="label-free-text"
              text={user?.career_education?.ed_qualification || 'Not provided'}
        text1="Highest Qualification"
      />
      <ListRows
        className="list-rows-11"
        divClassName="list-rows-7"
        divClassNameOverride="list-rows-4"
              divClassName1="list-rows-11"
        property1="label-free-text"
        text={user?.career_education?.ed_institution || 'Not provided'}
        text1="College"
      />
            </div>
        );

      case "personality":
        return (
          <div className="container">
      <div className="div-2">
        <ListRows
          className="list-rows-10"
          divClassName1="personality-title"
          property1="free-text"
          text="Personality"
                text1=""
        />
        <div className="diet">
          <div className="frame-2">
            <div className="label-pt">Diet</div>

            <div className="body-2">{user?.lifestyle_personality?.diet || 'Not provided'}</div>
          </div>
        </div>

        <div className="div-3">
          <div className="frame-wrapper-2">
            <div className="body-wrapper">
              <div className="body-3">Define Your Personality</div>
            </div>
          </div>

          <div className="personality-question">
            <div className="autolayout-row">
              <div className="div-2">
                <div className="label-2">Focus of Attention</div>

                <div className="test-variant">{user?.lifestyle_personality?.characterize_your_personality?.attention_focus || 'Not provided'}</div>
              </div>
            </div>

            <div className="hover-variant">
              {user?.lifestyle_personality?.characterize_your_personality?.attention_focus === 'Introvert' ? 'Energized by solitude and reflection.' : 'Energized by social interactions.'}
            </div>
          </div>

          <div className="personality-question">
            <div className="autolayout-row">
              <div className="div-2">
                <div className="label-2">Information Processing</div>

                <div className="test-variant">{user?.lifestyle_personality?.characterize_your_personality?.information_processing || 'Not provided'}</div>
              </div>
            </div>

            <p className="p">
              {user?.lifestyle_personality?.characterize_your_personality?.information_processing === 'Intuition' ? 'Prefers patterns, possibilities, and big-picture thinking.' : 'Focuses on concrete facts and details.'}
            </p>
          </div>

          <div className="personality-question">
            <div className="autolayout-row">
                    <div className="div-2">
              <div className="div-2">
                <div className="label-2">Decision-Making</div>

                <div className="test-variant">{user?.lifestyle_personality?.characterize_your_personality?.decision_making || 'Not provided'}</div>
                      </div>
              </div>
            </div>

            <p className="hover-variant-2">
              {user?.lifestyle_personality?.characterize_your_personality?.decision_making === 'Thinking' ? 'Values logic, objectivity, and structured reasoning.' : 'Prioritizes emotions and harmony.'}
            </p>
          </div>

          <div className="personality-question">
            <div className="autolayout-row">
                    <div className="div-2">
              <div className="div-2">
                <div className="label-2">Approach to the World</div>

                <div className="test-variant">{user?.lifestyle_personality?.characterize_your_personality?.situation_approach || 'Not provided'}</div>
                      </div>
              </div>
            </div>

            <p className="hover-variant-2">
              {user?.lifestyle_personality?.characterize_your_personality?.situation_approach === 'Judging' ? 'Prefers structure, planning, and organization.' : 'Adaptable, spontaneous, and open to change.'}
            </p>
          </div>
        </div>

        <div className="div-3">
          <div className="frame-wrapper-2">
            <div className="body-wrapper">
              <p className="body-3">What values matter most to you?</p>
            </div>
          </div>

          {user?.lifestyle_personality?.core_values_or_motivates_inspires && user.lifestyle_personality.core_values_or_motivates_inspires.length > 0 ? (
            user.lifestyle_personality.core_values_or_motivates_inspires.map((value, index) => (
              <div key={index} className="frame-wrapper-3">
                <div className="frame">
                  <div className="label-3">{value}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="frame-wrapper-3">
              <div className="frame">
                <div className="label-3">Not provided</div>
              </div>
            </div>
          )}
        </div>

        <div className="div-3">
          <div className="frame-wrapper-2">
            <div className="body-wrapper">
              <p className="body-3">What are your key strengths?</p>
            </div>
          </div>

          {user?.lifestyle_personality?.strengths && user.lifestyle_personality.strengths.length > 0 ? (
            user.lifestyle_personality.strengths.map((strength, index) => (
              <div key={index} className="frame-wrapper-3">
                <div className="frame">
                  <div className="label-3">{strength}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="frame-wrapper-3">
              <div className="frame">
                <div className="label-3">Not provided</div>
              </div>
            </div>
          )}
        </div>

        <div className="div-3">
          <div className="frame-wrapper-2">
            <div className="body-wrapper">
              <p className="body-3">What challenges do you face?</p>
            </div>
          </div>

          {user?.lifestyle_personality?.weaknesses && user.lifestyle_personality.weaknesses.length > 0 ? (
            user.lifestyle_personality.weaknesses.map((weakness, index) => (
              <div key={index} className="frame-wrapper-3">
                <div className="frame">
                  <div className="label-3">{weakness}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="frame-wrapper-3">
              <div className="frame">
                <div className="label-3">Not provided</div>
              </div>
            </div>
          )}
        </div>

        <div className="div-3">
          <div className="frame-wrapper-2">
            <div className="body-wrapper">
              <p className="body-3">How do you enjoy your free time?</p>
            </div>
          </div>

          {user?.lifestyle_personality?.free_time_activities && user.lifestyle_personality.free_time_activities.length > 0 ? (
            user.lifestyle_personality.free_time_activities.map((activity, index) => (
              <div key={index} className="frame-wrapper-3">
                <div className="frame">
                  <div className="label-3">{activity}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="frame-wrapper-3">
              <div className="frame">
                <div className="label-3">Not provided</div>
              </div>
            </div>
          )}
        </div>

        <div className="div-3">
          <div className="frame-wrapper-2">
            <div className="body-wrapper">
              <p className="body-3">What genres do you prefer?</p>
            </div>
          </div>

          {user?.lifestyle_personality?.preferred_genres && user.lifestyle_personality.preferred_genres.length > 0 ? (
            user.lifestyle_personality.preferred_genres.map((genre, index) => (
              <div key={index} className="frame-wrapper-3">
                <div className="frame">
                  <div className="label-3">{genre}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="frame-wrapper-3">
              <div className="frame">
                <div className="label-3">Not provided</div>
              </div>
            </div>
          )}
        </div>
            </div>
          </div>
        );

      case "spiritual":
        return (
          <div className="container">
            <div className="spiritual">
              <div className="spiritual-2">
                <ListRows
                  className="list-rows-6"
                  divClassName1="list-rows-5"
                  property1="free-text"
                  text="Spiritual"
                  text1=""
                />
                <ListRows
                  className="org"
                  divClassName="org-2"
                  divClassNameOverride="list-rows-4"
                  divClassName1="org"
                  property1="label-free-text"
                  text={user?.spiritual_info?.affiliated_with_spiritual_organization || 'Not provided'}
                  text1="Spiritual Organisation Affiliation"
                />
                <ListRows
                  className="how-long"
                  divClassName="design-component-instance-node"
                  divClassNameOverride="list-rows-2"
                  divClassName1="how-long"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.practicing_time_period?.toString() || 'Not provided'}
                  text1="How long in KC (in Yrs)"
                />
                <ListRows
                  className="chanting-rounds"
                  divClassName="design-component-instance-node"
                  divClassNameOverride="list-rows-4"
                  divClassName1="chanting-rounds"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.chanting_rounds || 'Not provided'}
                  text1="Chanting Rounds"
                />
                <ListRows
                  className="intiated-status"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="intiated-status"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.initiated || 'Not provided'}
                  text1="Are you initaited?"
                />
                <ListRows
                  className="spiritual-master"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="spiritual-master"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.initiation_details?.spiritual_master || 'Not provided'}
                  text1="Spiritual Master"
                />
                <ListRows
                  className="initiated-name"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="initiated-name"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.initiation_details?.initiation_name || 'Not provided'}
                  text1="Initiated Name"
                />
                <ListRows
                  className="local-temple"
                  divClassName="list-rows-12"
                  divClassNameOverride="local-temple-2"
                  divClassName1="local-temple"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.iskcon_associated || 'Not provided'}
                  text1="Affiliated with which local temple?"
                />
                <ListRows
                  className="affiliation"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="affiliation"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.temple_attended_associated_type || 'Not provided'}
                  text1="How are you affiliated with temple?"
                />
                <ListRows
                  className="how-often-visit"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="how-often-visit"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.temple_visit || 'Not provided'}
                  text1="How often do you visit temple?"
                />
                <ListRows
                  className="ekadashi-fasting"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="ekadashi-fasting"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.ekadashi_fasting || 'Not provided'}
                  text1="Do you observe fasting on Ekadashi days?"
                />
                <ListRows
                  className="element-regulative"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="element-regulative"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.four_regulative_principles || 'Not provided'}
                  text1="Do you follow Four Regulative Principles"
                />
                <ListRows
                  className="spiritual-role"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="spiritual-role"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.spirituality_role || 'Not provided'}
                  text1="Spirituality&#39;s role in your life?"
                />
                <div className="prabhupada-books">
                  <div className="div-2">
                    <p className="label">
                      What are the books of Srila Prabhupada that you have read?
                    </p>

                    <p className="body-pt">
                      <span className="text-wrapper">
                        {user?.spiritual_info?.iskcon_affiliation_details?.book_read?.length || 0} Books
                        <br />
                      </span>

                      <span className="span">
                        {user?.spiritual_info?.iskcon_affiliation_details?.book_read && user.spiritual_info.iskcon_affiliation_details.book_read.length > 0
                          ? user.spiritual_info.iskcon_affiliation_details.book_read.join(', ')
                          : 'Not provided'}
                        <br />
                      </span>
                    </p>
                  </div>
                </div>

                <ListRows
                  className="parent-kc"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="parent-kc"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.parents_practice_krishna || 'Not provided'}
                  text1="Do your parents practice Krishna Consciousness?"
                />
                <ListRows
                  className="spiritual-guide"
                  divClassName="list-rows-12"
                  divClassNameOverride="list-rows-4"
                  divClassName1="spiritual-guide"
                  property1="label-free-text"
                  text={user?.spiritual_info?.iskcon_affiliation_details?.spiritual_mentor || 'Not provided'}
                  text1="Who is your spiritual guide?"
                />
              </div>
            </div>
          </div>
        );

      case "partner-preferences":
        return (
          <div className="container">
        <div className="partner">
          <div className="frame-wrapper">
            <div className="frame">
              <div className="body">Partner Preferences</div>
            </div>
          </div>

          <div className="frame-wrapper-4">
            <div className="frame">
              <div className="body-4">Basic Preferences</div>
            </div>
          </div>

          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_marital_status?.join(', ') || 'Not provided'}
            text1="Marital Status"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
                text={user?.preferences?.preferred_language?.join(' • ') || 'Not provided'}
            text1="Language Known"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_city_location || 'Not provided'}
            text1="Preferred Location"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_height_start && user?.preferences?.preferred_height_end ? `${user.preferences.preferred_height_start} - ${user.preferences.preferred_height_end}` : user?.preferences?.preferred_height_start || 'Not provided'}
            text1="Height"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-4"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_age_start && user?.preferences?.preferred_age_end ? `${user.preferences.preferred_age_start} - ${user.preferences.preferred_age_end} Yrs` : 'Not provided'}
            text1="Preferred Age"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_religion || 'Not provided'}
            text1="Religion"
          />
          <ListRows
            className="list-rows-3"
            divClassName="list-rows-3"
            divClassNameOverride="list-rows-2"
                divClassName1="list-rows-3"
            property1="label-free-text"
            text="Not provided"
            text1="Ethicity"
          />
          <div className="frame-wrapper-4">
            <div className="frame">
              <div className="body-4">Community Preferences</div>
            </div>
          </div>

          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_religion || 'Not provided'}
            text1="Religion"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_caste || 'Not provided'}
            text1="Caste"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_community || 'Not provided'}
            text1="Community"
          />
          <div className="frame-wrapper-4">
            <div className="frame">
              <div className="body-4">Career Preferences</div>
            </div>
          </div>

          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
                text={user?.preferences?.preferred_qualification || 'Not provided'}
            text1="Qualification"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-4"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_occupation || 'Not provided'}
            text1="Professional Background"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_income || 'Not provided'}
            text1="Annual Income"
          />
          <div className="frame-wrapper-4">
            <div className="frame">
              <div className="body-4">Spiritual Preferences</div>
            </div>
          </div>

          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-4"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_cultural_values || 'Not provided'}
            text1="Cultural Values and Practices"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="design-component-instance-node"
            divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
            property1="label-free-text"
            text={user?.preferences?.preferred_affiliation?.join(', ') || 'Not provided'}
                text1="Partner's Affiliation"
          />
          <ListRows
            className="list-rows-instance"
            divClassName="list-rows-instance"
            divClassNameOverride="list-rows-2"
                divClassName1="list-rows-instance"
            property1="label-free-text"
            text={user?.preferences?.preferred_initiation_status || 'Not provided'}
            text1="Initiation Status"
          />
          <div className="frame-wrapper-4">
            <div className="frame">
              <div className="label">Diet Preferences</div>

              <div className="body-5">{user?.preferences?.preferred_food?.join(', ') || 'Not provided'}</div>
            </div>
          </div>
        </div>
          </div>
        );

      default:
        // Default to Basic Info
        return (
          <div className="container">
            <div className="div">
              <div className="frame-wrapper">
                <div className="frame">
                  <div className="body">Basic Info</div>
                </div>
              </div>

              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="Ramesh Kumar"
                text1="Name"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="Male"
                text1="Gender"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="Unmarried"
                text1="Marital Status"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="Kannada"
                text1="Mother Tongue"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="list-rows-3"
                divClassNameOverride="list-rows-2"
                divClassName1="list-rows-3"
                property1="label-free-text"
                text="Completely Healthy"
                text1="Disease or Disability"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="Hindi&nbsp;&nbsp;• English"
                text1="Language Known"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="Bangalore Urban"
                text1="Location"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="ethnicity"
                divClassNameOverride="list-rows-2"
                divClassName1="ethnicity"
                property1="label-free-text"
                text="Asian"
                text1="Ethicity"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="5 ft. 8 in"
                text1="Height"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="65 Kg"
                text1="Weight"
              />
              <ListRows
                className="list-rows-instance"
                divClassName="design-component-instance-node"
                divClassNameOverride="list-rows-2"
                divClassName1="design-component-instance-node"
                property1="label-free-text"
                text="Hindu"
                text1="Religion"
              />
      </div>
    </div>
  );
    }
  };

  return renderContent();
};
