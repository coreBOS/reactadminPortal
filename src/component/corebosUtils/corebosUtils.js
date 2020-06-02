import React from 'react';
import { RichTextField, TextField, EmailField, DateField, NumberField, UrlField, BooleanField, ImageField, SelectField, ReferenceField, DateInput, DateTimeInput, NumberInput, ReferenceInput, SelectInput, SelectArrayInput, BooleanInput, ImageInput, TextInput, AutocompleteInput, required } from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

function formatSearchObject(module, searchText) {
	if(!searchText){
		return;
	}
	let srch = {};
	srch['cblistsearch_'+module] = searchText;
	return srch;
}

const FormattedBooleanField = props => {
	props.record[props.source] = (props.record[props.source]==='1');
	return (<BooleanField {...props} />);
};

const FormattedBooleanInput = props => {
	console.log(props)
	props.record[props.source] = Number(props.record[props.source]);
	return (<BooleanInput {...props} />);
};

export default {
	field2DisplayElement: (field, module) => {
		switch (Number(field.uitype)) {
			case 21: // TextBox small
			case 19: // TextBox big
				return <RichTextField key={field.name} label={field.label} source={field.name} />;
			case 5: // Date
				return <DateField key={field.name} label={field.label} source={field.name} />;
			case 50: // DateTime
				return <DateField key={field.name} label={field.label} source={field.name} showTime />;
			case 7: // Number
				return <NumberField key={field.name} label={field.label} source={field.name} />;
			case 9: // Percentage
				return <NumberField key={field.name} label={field.label} source={field.name} options={{ style: 'percent' }} />;
			case 71: // Currency
				return <NumberField key={field.name} label={field.label} source={field.name} options={{ style: 'currency', currency: 'EUR' }} />;
			case 10: // Module Relation
				let eidfield = window.coreBOS.Describe[field.type.refersTo[0]].labelFields.split(',');
				return <ReferenceField key={field.name} label={field.label} source={field.name} reference={field.type.refersTo[0]} link="show" sortBy={field.type.refersTo[0]+'.'+eidfield[0]} >
						<TextField key={'ref'+field.name} source={eidfield[0]} />
					</ReferenceField>;
			case 101: // User Relation
			case 53: // User Relation: Assigned To
			case 52: // User Relation: Created and Modified by
				let userlist = window.coreBOS.Describe[module].userlist;
				return <SelectField key={field.name} label={field.label} source={field.name} choices={userlist} optionText="username" optionValue="userid" />;
			case 13: // Email
				return <EmailField key={field.name} label={field.label} source={field.name} />;
			case 17: // URL
				return <UrlField key={field.name} label={field.label} source={field.name} />;
			case 56: // Checkbox
				return <FormattedBooleanField key={field.name} label={field.label} source={field.name} />;
			case 69: // Image
				return <ImageField key={field.name} label={field.label} source={field.name+'imageinfo.fullpath'} />;
			case 15: // SelectWithRole,
			case 16: // Select,
			case 1613: // SelectModules,
			case 1024: // SelectRoles,
			case 33: // SelectMultiple,
			case 3313: // SelectModulesMultiple,
				return <SelectField key={field.name} label={field.label} source={field.name} choices={field.type.picklistValues} optionText="value" optionValue="label" />;
			case 1:
			case 11: // Phone
			case 14: // Time
			case 85: // Skype
			// 4: mod_alert_arr.AutoGenerated,
			default:
				return <TextField key={field.name} label={field.label} source={field.name} />;
		}
	},
	field2InputElement: (field, module) => {
		if (field.editable===false) {
			return null;
		}
		const isMandatory = field.mandatory ? required() : null;
		switch (Number(field.uitype)) {
			case 21: // TextBox small
				return <TextInput key={field.name} label={field.label} source={field.name} multiline validate={isMandatory} />;
			case 19: // TextBox big
				return <RichTextInput key={field.name} label={field.label} source={field.name} validate={isMandatory} />;
			case 5: // Date
				return <DateInput key={field.name} label={field.label} source={field.name} validate={isMandatory} />;
			case 50: // DateTime
				return <DateTimeInput key={field.name} label={field.label} source={field.name} validate={isMandatory} />;
			case 7: // Number
			case 9: // Percentage
			case 71: // Currency
				return <NumberInput key={field.name} label={field.label} source={field.name} validate={isMandatory} />;
			case 10: // Module Relation
				let refmod = field.type.refersTo[0];
				let eidfield = window.coreBOS.Describe[refmod].labelFields.split(',');
				return <ReferenceInput key={field.name} label={field.label} source={field.name} reference={refmod} filterToQuery={searchText => formatSearchObject(refmod, searchText)} validate={isMandatory} >
							<AutocompleteInput key={'ref'+field.name} optionText={eidfield[0]} />
						</ReferenceInput>;
			case 52: // User Relation: Created and Modified by
			case 70: // Created and Modified Time
				return null;
			case 53: // User Relation: Assigned To
			case 101: // User Relation
				let userlist = window.coreBOS.Describe[module].userlist;
				return <SelectInput key={field.name} label={field.label} source={field.name} choices={userlist} optionText="username" optionValue="userid" />;
			case 56: // Checkbox
				return <FormattedBooleanInput key={field.name} label={field.label} source={field.name} />;
			case 69: // Image
				return <ImageInput key={field.name} label={field.label} source={field.name} accept="image/*" >
						<ImageField key={'ref'+field.name} source={field.name} />
					</ImageInput>;
			case 15: // SelectWithRole,
			case 16: // Select,
			case 1613: // SelectModules,
			case 1024: // SelectRoles,
				return <SelectInput key={field.name} label={field.label} source={field.name} choices={field.type.picklistValues} optionText="value" optionValue="label" validate={isMandatory} />;
			case 33: // SelectMultiple,
			case 3313: // SelectModulesMultiple,
				return <SelectArrayInput key={field.name} label={field.label} source={field.name} choices={field.type.picklistValues} optionText="value" optionValue="label" validate={isMandatory} />;
			case 13: // Email
				return <TextInput key={field.name} label={field.label} source={field.name} type="email" validate={isMandatory} />;
			case 17: // URL
				return <TextInput key={field.name} label={field.label} source={field.name} type="url" validate={isMandatory} />;
			case 1:
			case 11: // Phone
			case 14: // Time
			case 85: // Skype
			// 4: mod_alert_arr.AutoGenerated,
			default:
				return <TextInput key={field.name} label={field.label} source={field.name} validate={isMandatory} />;
		}
	}
};
