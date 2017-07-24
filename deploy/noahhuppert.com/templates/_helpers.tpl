{{/* vim: set filetype=mustache: */}}
{{/*
Expand the name of the chart.
*/}}
{{- define "name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
*/}}
{{- define "fullname" -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- $environment := .Release.Name -}}
{{- $version := .Chart.appVersion | trunc 12 -}}
{{- printf "%s-%s-%s" $environment $name $version | trunc 63 | trimSuffix "-" -}}
{{- end -}}
